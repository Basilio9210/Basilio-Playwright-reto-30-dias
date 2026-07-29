const { spawn } = require("node:child_process");

(async ()=>{

    const chrome = spawn(
        `"C:/Program Files/Google/Chrome/Application/chrome.exe"`,
        ["--remote-debugging-port=9222"],
        {shell: true}
    )

}) ()