---
theme: github
---
# 模式介绍
又称为单体模式，保证一个类只有一个实例，并提供一个访问它的全局访问点。也 就是说，第二次使用同一个类创建新对象的时候，应该得到与第一次创建的对象完全相同的对象。

# 优缺点
- **优点** </br>
1. 节省内存空间，减少重复创建销毁性能开支
2. 减少垃圾回收机制的压力
3. 减少对资源的多重占用，例如向indexedDB存储信息，可以有效的避免被覆盖的场景
- **缺点** </br>
1. 单例模式对扩展不友好，一般是自行初始化，没有接口，不容易扩展
2. 与单一职责原则冲突，一个类只应该关心内部逻辑，不应该关系外面如何进行实例化

# 使用场景
1. 如果一个类实例化过程会消耗很多的资源，可以使用单例模式，例如 数据库连接，线程池，配置文件的缓存， window, document ...
2. 如果需要存储全局状态，则需要使用单例模式， 例如 vuex state, vue router ...
# 实现方式
## class 实现

```js
// class
class ManageGame {
    static _schedule = null
    static getInstance () {
        if (ManageGame._schedule) {
            return ManageGame._schedule
        }
        return ManageGame._schedule = new ManageGame()
    }

    constructor () {
        if (ManageGame._schedule) {
            return ManageGame._schedule
        }
        ManageGame._schedule = this
    }
}

const schedule1 = new ManageGame()
const schedule2 = ManageGame.getInstance()

console.log(schedule1 === schedule2) // true 
```
## iife 实现

```js
const Singleton = (function() {
    let _instance = null
    const Singleton = function() {
        if (_instance) {
            return _instance
        }
        _instance = this
        return _instance
    }

    Singleton.getInstance = function () {
        if (_instance) {
            return _instance
        }
        _instance = new Singleton()
        return _instance
    }
    return Singleton
})()

const sin1 = new Singleton()
const sin2 = Singleton.getInstance()
console.log(sin1 === sin2) // true
```
## let/const作用域 实现

```js
// 比iife 更简单一点
let getInstance 
{
    let _instance = null
    const Singleton = function () {
        if (_instance) {
            return _instance
        }
        _instance = this
        return _instance
    }
    getInstance = function() {
        if (_instance) {
            return _instance
        }
        _instance = new Singleton()
        return _instance
    }
}
```
## 代理 实现

```js
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}
/* 单例模式的赋能方法 */
function Singleton(FuncClass) {
    let _instance
    return new Proxy(FuncClass, {
        construct(target, args) {
            return _instance || (_instance = Reflect.construct(Person, args)) // 使用 new FuncClass(...args) 也可以
        }
    })
}
const PersonInstance = Singleton(Person)
const person1 = new PersonInstance('张小帅', 25)
const person2 = new PersonInstance('李小美', 23)
console.log(person1 === person2) // true
```
