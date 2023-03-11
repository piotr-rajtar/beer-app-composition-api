<template>
  <header :class="style.headerContainer">
    <h1 :class="style.header">BEER APP</h1>
  </header>
</template>

<style lang="scss" module="style">
.headerContainer {
  margin: 0;
  padding: 10px;
  background: linear-gradient(#FFFFB7, #FFD400);
  text-align: center;
}

.header {
  font-size: 30px;
}
</style>