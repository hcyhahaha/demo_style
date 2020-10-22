<template>
  <div class="calculator">
    <!-- 显示计算器结果 -->
    <div class="result" style="grid-area: result">{{ equation }}</div>
    <!-- 8个功能按钮 -->
    <button style="grid-area: ac" @click="clear">AC</button>
    <button style="grid-area: plus-minus" @click="calculateTogg">&#177;</button>
    <button style="grid-area: percent" @click="calculatePercent">%</button>
    <button style="grid-area: add" @click="append('+')">+</button>
    <button style="grid-area: subtract" @click="append('-')">-</button>
    <button style="grid-area: multiply" @click="append('x')">x</button>
    <button style="grid-area: divide" @click="append('÷')">&#247;</button>
    <button style="grid-area: equal" @click="calculate">=</button>

    <!-- 10个数字按钮 -->
    <button style="grid-area: number-1" @click="append(1)">1</button>
    <button style="grid-area: number-2" @click="append(2)">2</button>
    <button style="grid-area: number-3" @click="append(3)">3</button>
    <button style="grid-area: number-4" @click="append(4)">4</button>
    <button style="grid-area: number-5" @click="append(5)">5</button>
    <button style="grid-area: number-6" @click="append(6)">6</button>
    <button style="grid-area: number-7" @click="append(7)">7</button>
    <button style="grid-area: number-8" @click="append(8)">8</button>
    <button style="grid-area: number-9" @click="append(9)">9</button>
    <button style="grid-area: number-0" @click="append(0)">0</button>

    <!-- 小数点按钮 -->
    <button style="grid-area: dot" @click="append('.')">.</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equation: "0",
      // 是否输入小数位
      isDecimalAdded: false,
      // 判断是否加、减、乘、除
      isOPeratorAdded: false,
      // 判断是否已开始使用计算器
      isStarted: false,
    };
  },
  methods: {
    // 是否 加、减、乘、除
    isOPerator(characte) {
      // indexOf判断位置，如果大于-1，就代表已经存在
      return ["+", "-", "x", "÷"].indexOf(characte) > -1;
    },
    // 点击 加、减、乘、除、数字、小数点
    append(characte) {
      // start
      // 当equation的值为0，并且不是运算符，就可以更新this.equation的值
      if (this.equation === "0" && !this.isOPerator(characte)) {
        // 如果第一个是小数点，就保留原来的0
        if (characte === ".") {
          this.equation += "" + characte;
          this.isDecimalAdded = true;
        } else {
          // 如果不是，就将0替换掉
          this.equation = "" + characte;
        }
        this.isStarted = true;
        // 加入return，不再继续这个函数后续代码
        return;
      }

      // 当输入的是 数字 时
      if (!this.isOPerator(characte)) {
        if (characte === "." && this.isDecimalAdded) {
          return;
        }
        if (characte === ".") {
          this.isDecimalAdded = true;
          this.isOPeratorAdded = true;
        } else {
          this.isOPeratorAdded = false;
        }
        this.equation += "" + characte;
      }

      // 当输入 运算符 时
      if (this.isOPerator(characte) && !this.isOPeratorAdded) {
        console.log(this.isOPerator(characte));
        this.equation += "" + characte;
        this.isDecimalAdded = false;
        this.isOPeratorAdded = true;
      }
    },
    // 点击 '='时
    calculate() {
      // 替换 x ÷ 为标准运算
      let result = this.equation
        .replace(new RegExp("x", "g"), "*")
        .replace(new RegExp("÷", "g"), "/");

      // 计算
      this.equation = parseFloat(eval(result).toFixed(9)).toString();
      // 是否输入小数位
      this.isDecimalAdded = false;
      // 是否输入运算符
      this.isOPeratorAdded = false;
    },
    // 点击 正负号 时
    calculateTogg() {
      // 如果是刚输入运算符号，或者未开始使用计算器，就不能继续
      if (this.isOPeratorAdded || !this.isStarted) {
        return;
      }
      this.equation = this.equation + "*(-1)";
      this.calculate();
    },
    // 点击 '%' 时
    calculatePercent() {
      // 如果是刚输入运算符号，或者未开始使用计算器，就不能继续
      if (this.isOPeratorAdded || !this.isStarted) {
        return;
      }
      this.equation = this.equation + "*(0.01)";
      this.calculate();
    },
    // 点击 'AC' 时
    clear() {
      this.equation = "0";
      this.isDecimalAdded = false;
      this.isOPeratorAdded = false;
      this.isStarted = false;
    },
  },
};
</script>

<style>
/* 居中设置 */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eeeeee;
}

.calculator {
  /* 计算器按钮大小，都设置为80px */
  --button-width: 80px;
  --button-height: 80px;

  /* 4列6行 */
  display: grid;
  grid-template-areas:
    "result result result result"
    "ac plus-minus percent divide"
    "number-7  number-8 number-9 multiply"
    "number-4  number-5 number-6 subtract"
    "number-1  number-2 number-3 add"
    "number-0  number-0 dot equal";

  /* 设置横向列大小 */
  /* repeat函数，重复4次 */
  grid-template-columns: repeat(4, var(--button-width));
  /* 设置纵向列大小 */
  grid-template-rows: repeat(6, var(--button-height));

  /* 加入阴影--拟态化 */
  box-shadow: -8px -8px 16px -10px rgba(255, 255, 255, 1),
    8px 8px 16px -10px rgba(0, 0, 0, 0.15);
  padding: 24px;
  border-radius: 20px;
}

/* 按钮部分样式 */
.calculator button {
  margin: 8px;
  padding: 0;
  border: 0;
  display: block;
  outline: none;
  /* 圆角设置为按钮高度一半 */
  border-radius: calc(var(--button-height) / 2);
  font-size: 24px;
  font-family: "Helveica";
  font-weight: normal;
  color: #999;
  /* 设置按钮的背景颜色， 这里用到渐层颜色 */
  background: linear-gradient(
    135deg,
    rgba(230, 230, 230, 1) 0%,
    rgba(246, 246, 246, 1) 100%
  );
  /* 设置阴影 */
  box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1),
    4px 4px 10px -8px rgba(0, 0, 0, 0.3);
}

/* 按钮按下去的样式 */
.calculator button:active {
  /* 阴影由外部改为内部 */
  box-shadow: -4px -4px 10px -8px rgba(255, 255, 255, 1),
    4px 4px 10px -8px rgba(0, 0, 0, 0.3) inset;
}

/* 结果行 的样式设置 */
.result {
  text-align: right;
  line-height: var(--button-height);
  font-size: 48px;
  font-family: "Helveica";
  padding: 0 20px;
  color: #666;
}
</style>
