const input = document.getElementById("cmd-input");
const terminalContent = document.getElementById("terminal-content");
const commandLine = document.querySelector(".command-line");

const commands = {
    help: "Available commands: <span class='keyword'>help, ls, links, clear, whoami, cat [file], date</span>",
    ls: `
    <span class="comment">myLinks:</span>
    <div class="link-grid">
      <div><a href="https://github.com/mattiasstjernstrom" target="_blank">github.com</a></div>
      <div><a href="https://www.linkedin.com/in/mattias-stjernstrom/" target="_blank">linkedin.com</a></div>
      <div><a href="https://mehow.se/mattias-cv/" target="_blank">mattias.cv</a></div>
      <div><span class="comment">contact.txt</span></div>
    </div>
  `,
    links: `
    <span class="comment">myLinks:</span>
    <div class="link-grid">
      <div><a href="https://github.com/mattiasstjernstrom" target="_blank">github.com</a></div>
      <div><a href="https://www.linkedin.com/in/mattias-stjernstrom/" target="_blank">linkedin.com</a></div>
      <div><a href="https://mehow.se/mattias-cv/" target="_blank">mattias.cv</a></div>
      <div><span class="comment">contact.txt</span></div>
    </div>
  `,
    whoami: "guest@mehow.se",
    date: new Date().toString(),
    clear: "CLEAR",
    "cat contact.txt": "Email: <a href='mailto:mattias@mehow.se'>mattias@mehow.se</a>"
};

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const command = input.value.trim();
        if (command) {
            processCommand(command);
        }
        input.value = "";
        // Keep focus
        input.scrollIntoView();
    }
});

// Always keep focus on input
document.addEventListener("click", () => {
    input.focus();
});

function processCommand(cmd) {
    // Create a new line for the executed command (history)
    const historyLine = document.createElement("div");
    historyLine.className = "output";
    historyLine.innerHTML = `
    <span class="prompt"><span class="tilda">➜</span> <span class="directory">~</span></span> 
    <span class="foreground">${cmd}</span>
  `;

    // Insert before the current input line
    terminalContent.insertBefore(historyLine, commandLine);

    const lowerCmd = cmd.toLowerCase();

    // Handle Command
    let response = "";
    if (commands[lowerCmd]) {
        response = commands[lowerCmd];
    } else if (lowerCmd.startsWith("cat ")) {
        response = `cat: ${cmd.split(" ")[1]}: No such file or directory`;
    } else {
        response = `<span class='red'>command not found: ${cmd}</span>`;
    }

    if (response === "CLEAR") {
        // Remove all previous output but keep the welcome message if you want, 
        // or just remove everything before the last Input line.
        // Simpler: iterate and remove all div.output
        const outputs = terminalContent.querySelectorAll(".output");
        outputs.forEach(el => el.remove());
    } else {
        const responseLine = document.createElement("div");
        responseLine.className = "output";
        responseLine.innerHTML = response;
        terminalContent.insertBefore(responseLine, commandLine);
    }

    // Auto scroll to bottom
    terminalContent.scrollTop = terminalContent.scrollHeight;
}