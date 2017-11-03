<template>
	<div id="wrapperCanvas">
		<canvas id="stsroute"></canvas>
		<el-button type="primary" class="btn start-btn" @click="startRoute" :disabled="disableStartRouteBtn">{{playState}}</el-button>
		<el-table
      :data="tableData"
      style="width: 320px">
      <el-table-column
        prop="number"
        label="节点数"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        align="center"
        label="耗时"
        width="100">
      </el-table-column>
      <el-table-column
        prop="power"
        align="center"
        label="功耗">
      </el-table-column>
    </el-table>
		<!-- <el-button type="primary">主要按钮</el-button> -->
	</div>
</template>

<script>
	import {startDrawNoC, stsRoute} from 'nocRoute';
	import Vue from 'vue'
	export default {
		data() {
			return {
				animationParams: this.$store.getters.getSinglePointToSinglePointParam,
				canvas: null,
				fabric: null,
				disableStartRouteBtn: false,
				playState: '播放',
				routeLine: [],
				tableData: [
				{
					number:0,
					time: 0,
					power: 0,

				}],
			}
		},
		methods: {
			startRoute(){
				let params = this.animationParams;
				let self = this;
				this.routeLine = [...params.startPoint.split(',').map(function(value){return Number(value)}), ...params.endPoint.split(',').map(function(value){return Number(value)})];
				self.disableStartRouteBtn = true;
				self.playState = '正在播放';				
				
				stsRoute(this.routeLine,this.canvas).then(()=>{
					self.disableStartRouteBtn = false;
					self.playState = '播放';
					let number = window.resultRoute.length;
					let time = number * parseInt(params.delay) + 'nS';
					let power = number * parseInt(params.power) + 'mW';
					Vue.set(self.tableData, 0, {number, time, power})
				})
			}
		},
		mounted(){
			let self = this;
			import('fabric').then(()=>{
				self.canvas = startDrawNoC('stsroute');
				self.fabric = window.fabric;
			})

			// console.log(this.animationParams);
			// let params = this.animationParams;
			// window.routeLine = [...params.startPoint.split(',').map(function(value){return Number(value)}), ...params.endPoint.split(',').map(function(value){return Number(value)})];
			// console.log('routeLine: '+ routeLine);
			// this.canvas = startDrawNoC('stsroute');
			// stsRoute(routeLine,this.canvas)
		}
	}

</script>

<style lang="less" scoped>
	#wrapperCanvas {
		position: relative;
		height: 500px;
	}
	#stsroute {
		position: absolute;
		left: 50%;
		margin-left: -250px;
		top: 0;
	}
	.btn {
		position: absolute;
		left: 100px;
		top: 100px;
		width: 100px;
	}
	.el-table {
		position: absolute;
		top:190px;
		left: 0;
	}
</style>