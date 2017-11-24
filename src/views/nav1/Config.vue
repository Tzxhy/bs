<template>
	<section>
		<config></config>
	</section>
</template>

<script>
	// import util from '../../common/js/util'
	import Config from '../../components/Config.vue'
	export default {
		data() {
			
			return {
				//编辑界面数据
				
			}
		},
		methods: {
			
		},
		components: {
    // <my-component> 将只在父组件模板中可用
    	'config': Config
  	},
		mounted() {
			console.log(this.$store);
		}
	}

</script>

<style scoped>
/*.edit {
	margin-top: 100px;
	margin-left: 200px;
	margin-right: 200px;
}*/
.el-form-item {
	/*width: 500px;*/
}

</style>