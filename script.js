async function askAI() {

    const question = document.getElementById("question").value;
    const result = document.getElementById("result");

    if (!question.trim()) {
        alert("Please enter a question");
        return;
    }

    // Show loading
    result.innerHTML = "⏳ Thinking...";

    try {

        const response = await fetch("https://tahzeeb1122-teachingai.hf.space/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: question
            })
        });

        const data = await response.json();

        // Show AI answer on website
        result.innerHTML = data.reply;

    } catch (error) {

        result.innerHTML = "❌ Server error. Please try again later.";

        console.error(error);
    }
}