import mitt from"mitt";import uuid from"uuid-v4";import fetch,{Response}from"node-fetch";if(global.URL||(global.URL={}),!global.URL.$$objects){global.URL.$$objects=new Map,global.URL.createObjectURL=function(e){var t=uuid();return global.URL.$$objects[t]=e,"blob:http://localhost/"+t};var oldFetch=global.fetch||fetch;global.fetch=function(e,t){return e.match(/^blob:/)?new Promise(function(t,o){var n=new FileReader;n.onload=function(){var e=global.Response||Response;t(new e(n.result,{status:200,statusText:"OK"}))},n.onerror=function(){o(n.error)};var s=e.match(/[^/]+$/)[0];n.readAsText(global.URL.$$objects[s])}):oldFetch.call(this,e,t)}}function Event(e){this.type=e}global.document||(global.document={}),Event.prototype.initEvent=Object,global.document.createEvent||(global.document.createEvent=function(e){return new(global[e]||Event)(e)}),global.Worker=function Worker(url){var this$1=this,messageQueue=[],inside=mitt(),outside=mitt(),scope={onmessage:null,dispatchEvent:inside.emit,addEventListener:inside.on,removeEventListener:inside.off,postMessage:function(e){outside.emit("message",{data:e})},fetch:global.fetch,importScripts:function(){for(var e=[],t=arguments.length;t--;)e[t]=arguments[t]}},getScopeVar;inside.on("message",function(e){var t=getScopeVar("onmessage");t&&t.call(scope,e)}),this.addEventListener=outside.on,this.removeEventListener=outside.off,this.dispatchEvent=outside.emit,outside.on("message",function(e){this$1.onmessage&&this$1.onmessage(e)}),this.postMessage=function(e){null!=messageQueue?messageQueue.push(e):inside.emit("message",{data:e})},this.terminate=function(){throw Error("Not Supported")},global.fetch(url).then(function(e){return e.text()}).then(function(code){var vars="var self=this,global=self";for(var k in scope)vars+=","+k+"=self."+k;getScopeVar=eval("(function() {"+vars+";\n"+code+"\nreturn function(__){return eval(__)}})").call(scope);var q=messageQueue;messageQueue=null,q.forEach(this$1.postMessage)}).catch(function(e){outside.emit("error",e),console.error(e)})};
//# sourceMappingURL=jsdom-worker.m.js.map
