const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    output(input);
  }
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(utterances, answers, text)) {
    // Search for exact match in triggers
    product = compare(utterances, answers, text);
  } 
  else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }

  addChatEntry(input, product);
}

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span><img src="images/user.png" class="avatar">`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "images/bot-mini.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botImg);
  botDiv.appendChild(botText);
  
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000);
}

class Chatbox {
  constructor() {
      this.args = {
          openButton: document.querySelector('.chatbox__button'),
          chatBox: document.querySelector('.chatbox__support'),
          sendButton: document.querySelector('.send__button')
      }

      this.state = false;
      this.messages = [];
  }

  display() {
      const {openButton, chatBox} = this.args;

      openButton.addEventListener('click', () => this.toggleState(chatBox))

      
      const node = chatBox.querySelector('input');
      node.addEventListener("keyup", ({key}) => {
          if (key === "Enter") {
              this.onSendButton(chatBox)
          }
      })
  }
  onSendButton(chatbox) {
    var textField = chatbox.querySelector('input');
    let text1 = textField.value
    if (text1 === "") {
        return;
    }

    let msg1 = { name: "User", message: text1 }
    this.messages.push(msg1);
     // Scroll to bottom
     chatbox.scrollTop = chatbox.scrollHeight;

     // Clear input field
     textField.value = "";
    
  }      
  toggleState(chatbox) {
    this.state = !this.state;
    

    // show or hides the box
    if(this.state) {
        chatbox.classList.add('chatbox--active')
    } else {
        chatbox.classList.remove('chatbox--active')
    }
}
}
const chatbox = new Chatbox();
chatbox.display();
