(function(gloablObj){

    // MakeBeliveElement construcor function
    function MakeBelieveElement(nodes){
        this.nodes = nodes;
    }

    // Returns the how many the nodes are.
    MakeBelieveElement.prototype.getLength = function() {
        return this.nodes.length;
    }

    // 4.
    // Method that returnes a list of all parents of the CSS selectors.
    MakeBelieveElement.prototype.parent = function(optionalCSSSelector) {
        var parentList = [];
        for(var i = 0; i < this.getLength(); i++) {
            var node = parents(this.nodes[i], optionalCSSSelector, false, false);
            if(node !== undefined){
                if(!parentList.includes(node)){
                    parentList.push(node);
                }
            } 
        }
        return new MakeBelieveElement(parentList);
    }

    // 5.
    // Method that returns a list of all grandparants of the CSS selectors.
    MakeBelieveElement.prototype.grandParent = function(optionalCSSSelector) {
        var grandParentList = [];
        for(var i = 0; i < this.getLength(); i++) {
            var node = parents(this.nodes[i], optionalCSSSelector, true, false);
            if(node !== undefined){
                if(!grandParentList.includes(node)){
                    grandParentList.push(node);
                }
            }  
        }
        return new MakeBelieveElement(grandParentList);
    }

    // 6.
    // Method that returns a list of all ancestors of the CSS selectors.
    MakeBelieveElement.prototype.ancestor = function(optionalCSSSelector) {
        var ancestorList = [];
        for(var i = 0; i < this.getLength(); i++) {
            for(var i = 0; i < this.getLength(); i++) {
                var node = parents(this.nodes[i], optionalCSSSelector, false, true);
                if(node !== undefined){
                    if(!ancestorList.includes(node)){
                        ancestorList.push(node);
                    }
                }  
            }  
        }
        return new MakeBelieveElement(ancestorList);
    }

    // Helper function for parent, grandParent nad ancestor functions.
    function parents(node, optionalCSSSelector, grandParent,ancestor){
        // Get the parent node of the current node.
        var parentNode = node.parentNode;
        if(grandParent){
            parentNode = node.parentNode.parentNode;
        } 
        else if(ancestor){
            parentNode = node.parentNode.parentNode.parentNode;
        }
        // If the current node has a parent.
        if(parentNode !== undefined) {
            // If the function parameter has value.
            if(optionalCSSSelector !== undefined) {
                if(ancestor){
                    // While the parent node is not the HTMLDocument(root) and it does not match the function parameter CSSSelector.
                    while(parentNode.parentNode.nodeName !== 'HTML' && !parentNode.matches(optionalCSSSelector)) {
                        parentNode = parentNode.parentNode;
                    }
                }
                // If the parent node is or has CSSSelector.
                if(parentNode.matches(optionalCSSSelector)) {
                    return parentNode;
                }
            }
            else {
                return parentNode;
            }     
        }
        else {
            return undefined;
        }
    }

    // 7.
    MakeBelieveElement.prototype.onClick = function(callback) {
        return attachEvent.call(this, 'onClick', callback)
    }
    
    // 8.
    MakeBelieveElement.prototype.insertText = function(text) {
        for(var i = 0; i < this.getLength(); i++) {
            this.nodes[i].textContent = text;
        }
        return new MakeBelieveElement(this.nodes);
    }

    // 9.
    MakeBelieveElement.prototype.append = function(text) {
        for(var i = 0; i < this.getLength(); i++) {
            if(typeof text === 'object'){
                this.nodes[i].appendChild(text);
            }
            else {
                this.nodes[i].innerHTML += text;
            }
        }
        return new MakeBelieveElement(this.nodes);
    }

    // 10.
    MakeBelieveElement.prototype.prepend = function(text) {
        for(var i = 0; i < this.getLength(); i++) {
            if(typeof text === 'object'){
                this.nodes[i].prepend(text);
            }
            else {
                this.nodes[i].innerHTML = text + this.nodes[i].innerHTML;
            }
        }
        return new MakeBelieveElement(this.nodes);
    }

    // 11.
    MakeBelieveElement.prototype.delete = function() {
        for(var i = 0; i < this.getLength(); i++) {
            if(this.nodes[i].parentNode) {
                this.nodes[i].parentNode.removeChild(this.nodes[i]);
            }
        }
        return new MakeBelieveElement(this.nodes);
    }

    // 12.
    function ajax(opt) {
        var xhr = new XMLHttpRequest();

        // If Url is empty or undefined.
        if(isEmpty(opt.url)){
            console.error('Url requied.');
            return undefined;
        }

        // If the data is undefined.
        if(opt.data === undefined) {
            opt.data = {};
        }


        // If the timeout is not undefined.
        if(!isEmpty(opt.timeout)) {
            opt.timeout = parseInt(opt.timeout);
            if(opt.timeout < 0) {
                opt.timeout = 0;
            }
        } 
        else {
            opt.timeout = 0;
        }


        // If the method is undefined and of the type string.
        if(!isEmpty(opt.method) && typeof opt.method === 'string'){
            opt.method = opt.method.toUpperCase();
            // If the method is valid.
            if(opt.method !== 'POST' && opt.method !== 'PUT' && opt.method !== 'PATCH' && opt.method !== 'DELETE') {
                opt.method = 'GET';
            }
        }
        else {
            opt.method = 'GET';
        }
        // Open the request.
        xhr.open(opt.method, opt.url);
        // Set the timeout of the request.
        xhr.timeout = opt.timeout;
        // Set the header of the request.
        setHeaders(xhr, opt);

        // set the timeout listener.
        xhr.ontimeout = function() {
            console.log("Request has timed out!");
        }

        // Set the state change listener.
        xhr.onreadystatechange = function() {
            // If the request is done.
            if(xhr.readyState === XMLHttpRequest.DONE){
                // If the status code is between 200 to 299 then send the reponsetext.
                if(xhr.status >= 200 && xhr.status < 400) {
                    opt.success(xhr.responseText);
                }
                else {
                    opt.success = null;
                }
            } 
            // Else if the status code is higer then or equal to 400 then send the reponsetext.
            else if(xhr.status >= 400) {
                opt.fail(xhr.responseText);
            }
            else {
                opt.fail = null;
            }
        }; 

        // Return the request before sending.
        opt.beforeSend(xhr);

        // Send the request.
        if(opt.method === 'GET' || opt.method === 'DELETE') {
            xhr.send();
        }
        else {
            xhr.send(JSON.stringify(opt.data));
        }
        

        // Helper function to set the header.
        function setHeaders(xhr, opt) {
            if('headers' in opt) { 
                for(var i = 0; i < opt.headers.length; i++) {
                    var header = opt.headers[i];
                    var key = Object.keys(header)[i];
                    xhr.setRequestHeader(key, header[key]);
                }
            }
        }
    }

    // 13.
    MakeBelieveElement.prototype.css = function(target, value) {
        for(var i = 0; i < this.getLength(); i++) {
            this.nodes[i].style[target] = value;
        }
        return new MakeBelieveElement(this);
    }

    // 14.
    MakeBelieveElement.prototype.toggleClass = function(target) {
        for(var i = 0; i < this.getLength(); i++) {
            this.nodes[i].classList.toggle(target);
        }
        return new MakeBelieveElement(this);
    }
    // 15.
    MakeBelieveElement.prototype.onSubmit = function(callback) {
        return attachEvent.call(this, 'submit', callback);
    }
    // 16.
    MakeBelieveElement.prototype.onInput = function(callback) {
        return attachEvent.call(this, 'input', callback);
    }

    // Helper function for events.
    function attachEvent(eventType, callback) {
        if(typeof eventType === 'string') {
            for(var i = 0; i < this.getLength(); i++) {
                if(eventType === 'submit') {
                    this.nodes[i].addEventListener(eventType, function(callback) {
                        callback.preventDefault();
                        return callback;
                    });
                } 
                else {
                    this.nodes[i].addEventListener(eventType, callback);
                }       
            }

        }
        return this.nodes;
    }

    // Utility functions
    function isEmpty(x) {
        return  x === undefined || x.length === 0;
    }

    function query(cssSelection) {
        return new MakeBelieveElement(document.querySelectorAll(cssSelection));
    }

    gloablObj.__ = query;
    gloablObj.__.ajax = ajax;

})(window);

// 4.  
// var parent = __('#password').parent();
// var formParent = __('#password').parent('form');
// var formParentClass = __('#password').parent('.parentClass');
// var formParentId = __('#password').parent('#parentId');
// var formParentUnkownId = __('#password').parent('#unknownId');

// console.log(parent);
// console.log(formParent);
// console.log(formParentClass);
// console.log(formParentId);
// console.log(formParentUnkownId);

// 5.
// var grandParent = __('#password').grandParent();
// var grandParentClass = __('#password').grandParent('.grandfatherClass');
// var grandParentId = __('#password').grandParent('#grandfatherId');
// var emptyGrandParent = __('#password').grandParent('#unknownId');
// console.log(grandParent);
// console.log(grandParentClass);
// console.log(grandParentId);
// console.log(emptyGrandParent);

// 6.
// var ancestor = __('#password').ancestor();
// var ancestorClass = __('#password').ancestor('.ancestor');
// var ancestorUnknown = __('#password').ancestor('#unknownId');

// console.log(ancestor);
// console.log(ancestorClass);
// console.log(ancestorUnknown);

// 7.
// __('#password').onClick(function(evt) {
//     console.log(evt.target.value);
// })

// 8.
//__('#shakespeare-novel').insertText('To be, or not to be: that is the question.');

// 9.
// __('.the-appender').append('<p>I am an appended paragraph!</p>');
// __('.the-appender').append(document.createElement('p').appendChild(document.createTextNode('I am an appended paragraph!')));

// 10.
//__('.the-appender').prepend('<p>I am an appended paragraph!</p>').prepend('<p>I am an appended!</p>');
//__('.the-appender').prepend(document.createElement('p').appendChild(document.createTextNode('I am an appended paragraph!')));


// 11.
//__('.some-div h2').delete();


// 12.
__.ajax({
    url: 'https://serene-island-81305.herokuapp.com/api/200',
    method: 'GET',
    timeout: 500,
    data: {},
    // headers: [
    //     { 'Authorization': 'my-secret-key'}
    // ],
    success: function (resp) {
        console.log('Success: ' + resp);
    },
    fail: function (error) {
        console.log('Error: ' + error);
    },
    beforeSend: function (xhr) {
        console.log('BeforeSend: ' + xhr)
    }
})

// 13.
//__('.the-appender').css('margin-bottom', '50px');

// 14.
//__('.the-appender').toggleClass('someClass');

// 15.
// __('#parentId').onSubmit(function (evt) {
//     console.log("Submitid")
// });

// 16.
// __('#parentId').onInput(function (evt) {
//     console.log(evt.target.value);
// });