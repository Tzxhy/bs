<template>
	<div id="wrapperCanvas">
		<canvas id="stsroute"></canvas>
	</div>
</template>

<script>
	import {startDrawNoC, stsRoute} from 'nocRoute';
	import exec from 'fabric'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted(){
			// var scriptEle = document.createElement('script');
			// scriptEle.src='./static/fabric.js'
			// document.getElementById('wrapperCanvas').appendChild(scriptEle);
			var canvas = startDrawNoC('stsroute');
			stsRoute([0,0,3,3],canvas)
			// console.log(a);
		}
	}

</script>

<style lang="less">
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
</style>