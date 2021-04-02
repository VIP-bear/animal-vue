<template>
  <div>
    <Header></Header>
    <div class="user-message">
      <div class="message-title">
        消息
      </div>
      <div class="message-content">
        <el-row v-for="o in 10" :key="o" style="margin-top:10px;" @click.native="message(o)">消息{{o}}</el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  name: 'Message',
  data () {
    return {
      msg: 'animal'
    }
  },
  methods: {
    message (index) {
      alert(index)
    }
  }
}
</script>

<style scoped>
.user-message {
  margin: 20px 25%;
  background-color: rgb(214, 212, 212);
}
.message-title {
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
}
.message-content {
  text-align: left;
  margin: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
