var template = (function () {
  let socket = io('http://localhost:5000');
  let user = '';
  return {
    onrender () {
      socket.on('message', (data) => {
        let messages = this.get('messages');
        let newMessages = [...messages, data.text];
        console.log(newMessages);
        this.set({messages: newMessages});
      });  
    },

    onteardown () {
      socket.disconnect();
    },

    data () {
      return {
        messages: [],
        loggedIn: false
      };
    },
    
    methods: {
      sendMessage ( ) {
        let newMessage = this.refs['msg'].value;
        
        if(newMessage) {
          socket.emit('add-message', {content: newMessage, from: user, time: new Date().toLocaleTimeString()});
          this.refs['msg'].value = '';
        }
      },

      login() {
        user = this.refs['user'].value;
        
        if(user) {
          this.set({loggedIn: true});
        }
      }
    }
  };
}());

function renderMainFragment ( root, component ) {
	var h3 = createElement( 'h3' );
	
	appendNode( createText( "Svelte Chat" ), h3 );
	var text1 = createText( "\n\n" );
	var ifBlock_anchor = createComment( "#if !loggedIn" );
	
	function getBlock ( root ) {
		if ( !root.loggedIn ) return renderIfBlock_0;
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );

	return {
		mount: function ( target, anchor ) {
			insertNode( h3, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
		},
		
		update: function ( changed, root ) {
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},
		
		teardown: function ( detach ) {
			if ( ifBlock ) ifBlock.teardown( detach );
			
			if ( detach ) {
				detachNode( h3 );
				detachNode( text1 );
				detachNode( ifBlock_anchor );
			}
		},
	};
}

function renderIfBlock_1 ( root, component ) {
	var ul = createElement( 'ul' );
	ul.className = "list-group";
	
	var eachBlock_anchor = createComment( "#each messages" );
	appendNode( eachBlock_anchor, ul );
	var eachBlock_value = root.messages;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	var text = createText( "\n\n  " );
	
	var div = createElement( 'div' );
	div.className = "form-group";
	
	var input = createElement( 'input' );
	component.refs.msg = input;
	input.className = "form-control";
	input.placeholder = "Message";
	input.id = "msg";
	
	appendNode( input, div );
	var text1 = createText( "\n  " );
	
	var button = createElement( 'button' );
	button.type = "button";
	
	function clickHandler ( event ) {
		component.sendMessage();
	}
	
	button.addEventListener( 'click', clickHandler, false );
	
	button.className = "btn btn-primary pull-right";
	
	appendNode( createText( "Send Message" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( ul, target, anchor );
			insertNode( text, target, anchor );
			insertNode( div, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( button, target, anchor );
		},
		
		update: function ( changed, root ) {
			var eachBlock_value = root.messages;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			for ( var i = eachBlock_value.length; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( true );
			}
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( false );
			}
			
			if ( component.refs.msg === input ) component.refs.msg = null;
			button.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) {
				detachNode( ul );
				detachNode( text );
				detachNode( div );
				detachNode( text1 );
				detachNode( button );
			}
		},
	};
}

function renderEachBlock ( root, eachBlock_value, msg, msg__index, component ) {
	var li = createElement( 'li' );
	li.className = "list-group-item";
	
	var div = createElement( 'div' );
	
	appendNode( div, li );
	
	var strong = createElement( 'strong' );
	
	appendNode( strong, div );
	var text = createText( msg.from );
	appendNode( text, strong );
	
	var span = createElement( 'span' );
	span.className = "time";
	
	appendNode( span, div );
	var text1 = createText( msg.time );
	appendNode( text1, span );
	appendNode( createText( "\n        " ), li );
	
	var div1 = createElement( 'div' );
	
	appendNode( div1, li );
	var text3 = createText( msg.content );
	appendNode( text3, div1 );

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, msg, msg__index ) {
			var msg = eachBlock_value[msg__index];
			
			text.data = msg.from;
			
			text1.data = msg.time;
			
			text3.data = msg.content;
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( li );
			}
		},
	};
}

function renderIfBlock_0 ( root, component ) {
	var div = createElement( 'div' );
	div.className = "form-group";
	
	var input = createElement( 'input' );
	component.refs.user = input;
	input.className = "form-control";
	input.placeholder = "Name";
	input.id = "userName";
	
	appendNode( input, div );
	var text = createText( "\n  " );
	
	var button = createElement( 'button' );
	button.type = "button";
	
	function clickHandler ( event ) {
		component.login();
	}
	
	button.addEventListener( 'click', clickHandler, false );
	
	button.className = "btn btn-primary pull-right";
	
	appendNode( createText( "Join" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			insertNode( text, target, anchor );
			insertNode( button, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( component.refs.user === input ) component.refs.user = null;
			button.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) {
				detachNode( div );
				detachNode( text );
				detachNode( button );
			}
		},
	};
}

function Chat ( options ) {
	options = options || {};
	
	this.refs = {}
	this._state = Object.assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
	
	if ( options._root ) {
		options._root._renderHooks.push({ fn: template.onrender, context: this });
	} else {
		template.onrender.call( this );
	}
}

Chat.prototype = template.methods;

Chat.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Chat.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Chat.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

Chat.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Chat.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Chat.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );
template.onteardown.call( this );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function noop() {}

function createComment( data ) {
	return document.createComment( data );
}

export default Chat;