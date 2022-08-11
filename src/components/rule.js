import { Status } from "./status";
import { logMaker } from "../utils/log"
import { isEmpty } from "../utils"
import { data } from "./data";

const log = logMaker(false)

class Rule {
  // 不能在第一个
  canNotUseFirst = () => {
    if (isEmpty(Status.currentInputDomvalue)) {
      return false
    }
    log(`${this.canNotUseFirst.name} passed`)
    return true
  }

  // 不能与运算符一起
  canNotUseWithOperator = () => {
    const input = Status.currentInputDomvalue.split('')
    const lastInput = input.pop()
    let checkStatus = true
    data.pureOperatorTag.every(tag => {
      if (tag === lastInput) {
        checkStatus = false
        return false
      }
      return true
    })
    // console.log(checkStatus)
    if (checkStatus) {
      return true
    } else {
      return false
    }
    // log(`${this.canNotUseWithOperator.name} passed`)
  }

  // 不能在 点 后面
  canNotUseWithPointer = () => {
    const input = Status.currentInputDomvalue.split('')
    const lastInput = input.pop()
    if (lastInput === '.') {
      return false
    }
    log(`${this.canNotUseWithPointer.name} passed`)
    return true
  }

  // 不能在产生结果后 使用
  canNotUseAfterResult = () => {
    if (Status.lastInputShowResult) {
      return false
    }
    log(`${this.canNotUseWithPointer.name} passed`)
    return true
  }

  // 数字开头部分不能出现两次  00不行， 3+00不行
  firstNotDouble = () => {
    const currentInputTag = Status.currentInputInfo.tag
    const lastInputGroup = Status.currentInputDomSplit.pop()
    if ( currentInputTag === lastInputGroup ) {
      return false
    }
    log(`${this.firstNotDouble.name} passed`)
    return true
  }
  // 不能再当前数字已经有点号的情况下使用
  canNotUseIfTheNumAlreadyHavePointer = () => {
    const lastInputGroup = Status.currentInputDomSplit.pop()
    if (lastInputGroup?.serch(/\./) != -1) {
      return false
    }
    log(`${this.canNotUseIfTheNumAlreadyHavePointer} passed`)
    return true
  }
}

const rule = new Rule()
export { rule }