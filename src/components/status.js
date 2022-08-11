import { data } from "./data"
import { dom } from "./dom"

class Status {
  // 当前输入信息
  static currentInputInfo = null
  // 当前输入信息的状态
  static currentInputStatus = Status._getEachTimeInputStatus()
  // 当前InputDom的值
  static currentInputDomvalue = Status.getInputDomValue()
  // 当前InputDom值的拆分信息(非优化)
  static currentInputDomSplit = Status.getInputDomValueSplit()
  // 当前InputDom值的拆分信息(优化)
  static currentInputDomSplitOptimize = Status._getInputDomValueSplitOptimize()
  // 上一次输入是否产生计算结果
  static lastInputShowResult = false

  // 生成状态
  static generate(currentInputInfo) {
    Status.currentInputInfo = currentInputInfo
    Status.currentInputStatus = Status._getEachTimeInputStatus()
    Status.currentInputDomvalue = Status.getInputDomValue()
    Status.currentInputDomSplit = Status.getInputDomValueSplit()
    Status.currentInputDomSplitOptimize = Status._getInputDomValueSplitOptimize()
  }
  // 获取每次输入的状态
  static _getEachTimeInputStatus() {
    return data.getInputStatus(Status.currentInputInfo)
  }
  // 获取当前计算器输入部分已经显示的内容
  static getInputDomValue(){
    return dom.getInputDom().value
  }
  // 获取当前计算器输入部分已经显示的内容的拆分结果
  static getInputDomValueSplit(optimize = false) {
    return data.analysisString(Status.getInputDomValue(), optimize)
  }
  // 获取当前计算器输入部分已经显示的内容的拆分结果 优化数据
  // 0.0000 => 0   00001 => 1   2. =>
  static _getInputDomValueSplitOptimize() {
    return data.optimize(Status.currentInputDomSplit)
  }
}

export { Status }