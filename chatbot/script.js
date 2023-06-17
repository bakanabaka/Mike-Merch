const natural = require('natural');

// Define the training data
const trainingData = [
    { input: 'hello', output: 'Hi there!' },
    { input: 'hi', output: 'Hi there!' },
    { input: 'how are you?', output: 'I am doing well, thanks for asking.' },
    { input: 'what is your name?', output: 'My name is Chatbot.' },
    { input: 'what time is it?', output: new Date().toLocaleTimeString() }
];

// Train the classifier
let classifier;
natural.BayesClassifier.load('classifier.json', null, function (err, loadedClassifier) {
    if (err) {
        classifier = new natural.BayesClassifier();
        trainingData.forEach(data => classifier.addDocument(data.input, data.output));
        classifier.train();
        classifier.save('classifier.json', function (err, classifier) {
            if (err) console.error(err);
            console.log('Classifier trained and saved!');
        });
    } else {
        classifier = loadedClassifier;
        console.log('Classifier loaded from file!');
    }
});

function send() {
    const userInput = document.getElementById('userinput').value.toLowerCase();
    let response;

    // Use the classifier to get the appropriate response
    classifier.getClassifications(userInput, function (err, classifications) {
        if (err) {
            console.error(err);
            response = 'I didn\'t understand that. Please try asking me something else.';
        } else {
            const classification = classifications[0];
            if (classification.value > 0.7) {
                response = classification.label;
            } else {
                response = 'I didn\'t understand that. Please try asking me something else.';
            }
        }
        document.getElementById('chatbox').innerHTML += `<p><strong>You:</strong> ${userInput}</p><p><strong>Chatbot:</strong> ${response}</p>`;
        document.getElementById('userinput').value = '';
    });
}
