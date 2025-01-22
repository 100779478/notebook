// MyConsoleRemovePlugin.js
class MyConsoleRemovePlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('MyConsoleRemovePlugin', complication => {
            for (let name in complication.assets) {
                console.log(123321123, name)
                if(name.endsWith('.js')) {
                    console.log(22222)
                }
            }
        });
    }
}

module.exports = MyConsoleRemovePlugin;
