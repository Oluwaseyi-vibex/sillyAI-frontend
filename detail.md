once a user inputs all the info about what they want to learn and how they want to learn it, these are all the inputs that the user can provide to the model:
1. what they want to learn (topic)
2. what is their current knowledge level on the topic (beginner, intermediate, advanced)

then they click generate learning path. the agent will generate a learning path for the user, which is a list of lessons that the user can learn from, in a step by step manner.

1. first a learning path is generated for the user in json format. it should have the following structure:
{
  "lessons": [
    {
      "id": 1,
      "title": "what is quantum mechanics?",
      "content": {
        simpleExplanation: "...",
        analogy: "...",
        realLifeExample: "...",
        keyTakeaways: ["...", "...", "..."],
      },
      "resources": [...]
    },
    {
      "id": 2,
      "title": "why quantum mechanics?",
      "content": {
        simpleExplanation: "...",
        analogy: "...",
        realLifeExample: "...",
        keyTakeaways: ["...", "...", "..."],
      },
      "resources": [...]
    },
    {
      "id": 3,
      "title": "how does quantum mechanics work?",
      "content": {
        simpleExplanation: "...",
        analogy: "...",
        realLifeExample: "...",
        keyTakeaways: ["...", "...", "..."],
      },
      "resources": [...]
    },
    {
      "id": 4,
      "title": "core concepts explained",
      "content": {
        simpleExplanation: "...",
        analogy: "...",
        realLifeExample: "...",
        keyTakeaways: ["...", "...", "..."],
      },
      "resources": [...]
    },
    {
      "id": 5,
      "title": "real-world applications",
      "content": {
        simpleExplanation: "...",
        analogy: "...",
        realLifeExample: "...",
        keyTakeaways: ["...", "...", "..."],
      },
      "resources": [...]
    },
    {
      "id": 6,
      "title": "resources",
      "content": {
        simpleExplanation: "...",
        analogy: "...",
        realLifeExample: "...",
        keyTakeaways: ["...", "...", "..."],
      },
      "resources": [...]
    }
  ]
}
2. then the user can click on any lesson in the learning path to start learning it, if he clicks on start journey button, all the lessons in the learning path are started. a topic should be broken down into 6 lessons, the last lession should be resources.  . for example, if the topic is "how to learn quantum mechanics", the lessons could be:
1. what is quantum mechanics?
2. why quantum mechanics?
3. how does quantum mechanics work?
4. core concepts explained
5. real-world applications
6. resources  (here the AI can provide, links to youtube videos, blogs, pdfs, etc. that can help the user learn the topic.)


Once a user click on a particular lesson, the user will be taken to a lesson page where the AI will start teaching the user about the topic. there would be analogy to make it easy for them to understand. the explanations should be simple and concise. for eg, if the user wants to learn about "how does blockchain work?" at "Explain like I'm 10" level, the AI should explain it in a way that a 10 year old can understand. they should also provide real world examples and applications of the topic.