// .claude/hooks/guard.js
// Hook PreToolUse: protege secretos y bloquea comandos destructivos.
// Exit code 2 = bloquear la acción y avisarle a Claude el motivo.

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let data;
  try {
    data = JSON.parse(input);
  } catch {
    process.exit(0);
  }

  const tool = data.tool_name;
  const toolInput = data.tool_input || {};
  const block = (message) => {
    console.error(message);
    process.exit(2);
  };

  // 1. Archivos de secretos (.env, .env.local, etc.), salvo .env.example
  if (["Read", "Edit", "Write"].includes(tool)) {
    const filePath = String(toolInput.file_path || "").replace(/\\/g, "/");
    const fileName = filePath.split("/").pop();
    if (/^\.env(\..+)?$/.test(fileName) && fileName !== ".env.example") {
      block(
        "Bloqueado: no se leen ni modifican archivos .env. " +
          "Las claves las completa el dueño del proyecto a mano. Usá .env.example."
      );
    }
  }

  // 2. Comandos peligrosos en la terminal
  if (tool === "Bash") {
    const command = String(toolInput.command || "");
    const dangerous = [
      [/(cat|type|more|less|Get-Content)\s+[^|&;]*\.env(?!\.example)/i, "leer archivos .env"],
      [/migrate\s+reset/i, "prisma migrate reset (borra toda la base)"],
      [/--force-reset/i, "reinicio forzado de la base"],
      [/--accept-data-loss/i, "cambios con pérdida de datos"],
      [/drop\s+(table|database|schema)/i, "DROP de tablas o base"],
      [/truncate\s+table/i, "TRUNCATE de tablas"],
      [/git\s+push\s+[^|&;]*--force/i, "git push --force"],
      [/rm\s+-rf?\s+(\/|~|\*|\.\s*$)/i, "borrado masivo de archivos"],
    ];
    for (const [pattern, label] of dangerous) {
      if (pattern.test(command)) {
        block(
          `Bloqueado: ${label}. Si de verdad hace falta, pedile confirmación al dueño del proyecto y que lo ejecute él.`
        );
      }
    }
  }

  process.exit(0);
});
