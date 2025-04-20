import {API_KEY, FORM_ID, FORM_INFO_API, FORM_QUESTIONS_API, SUBMIT_API} from "./constants.js";

function getFormInfo(callback) {
    fetch(FORM_INFO_API(FORM_ID) + "?apiKey=" + API_KEY)
        .then(response => response.json())
        .then(data => {
            if (data.message === "success") {
                callback(data.content);
            } else alert(data.message);
        });
}

function getFormQuestions(callback) {
    fetch(FORM_QUESTIONS_API(FORM_ID) + "?apiKey=" + API_KEY)
        .then(response => response.json())
        .then(data => {
            if (data.message === "success") {
                callback(data.content);
            } else alert(data.message);
        });
}

function createAnswer(products, boughtProducts, name, addr) {

    let productAnswers = {};
    let paymentArray = {};
    paymentArray.product = [];
    paymentArray.currency = "USD";
    paymentArray.total = 0;
    paymentArray.shortView = {};
    paymentArray.shortView.products = [];
    for (let i = 0; i < boughtProducts.length; i++) {
        const pid = boughtProducts[i].pid;
        const product = products.find(product => product.pid === pid);
        const string = `${product.name} (Amount: ${product.price} USD, Quantity: ${boughtProducts[i].quantity})`;
        const price = product.price * boughtProducts[i].quantity;
        paymentArray.total += price;
        paymentArray.product.push(string);
        paymentArray.shortView.products.push({
            title: product.name,
            image: JSON.parse(product.images)[0],
        });
        productAnswers[i] = boughtProducts[i].pid;
        productAnswers[i + boughtProducts.length] = JSON.stringify(product);
    }
    productAnswers["paymentArray"] = JSON.stringify(paymentArray);

    let questions;
    getFormQuestions((data) => {
        questions = data;
        console.log(questions);

        for (let qid in questions) {
            let question = questions[qid];
            questions[qid] = {
                name : question.name,
                type : question.type,
                order : question.order,
                text : question.text,
            }

            if (question.name === "fullName") {
                questions[qid].answer = name;
            }
            if (question.name === "typeA36") {
                questions[qid].answer = addr;
            }
            if (question.name === "forWholesale") {
                questions[qid].answer = productAnswers;
                questions[qid].product = products;
            }
        }

        const submission = {};
        for (let qid in questions) {
            if (!questions[qid].answer) continue;
            submission[qid] = questions[qid].answer;
        }

        console.log(submission);

        fetch(SUBMIT_API(FORM_ID) + "?apiKey=" + API_KEY, {
            method: "POST",
            body: JSON.stringify(submission),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "success") {
                    alert("Your order has been submitted successfully!");
                } else alert(data.message);
            });
    });
}

export {
    getFormInfo,
    createAnswer,
}