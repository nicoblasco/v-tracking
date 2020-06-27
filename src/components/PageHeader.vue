<template>
	<vue-scroll class="page-page-headers">
		<div class="page-header header-accent-gradient card-base card-shadow--small">
			<h1>{{title}}</h1>
			<h4>{{subtitle}}</h4>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item v-if="subtitle !=undefined">{{subtitle}}</el-breadcrumb-item>
				<el-breadcrumb-item v-if="thirdtitle !=undefined">{{thirdtitle}}</el-breadcrumb-item>
				<el-breadcrumb-item v-if="title !=undefined">{{title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	</vue-scroll>
</template>

<script>
export default {
    name: 'PageHeaders',
    props:['title','subtitle','thirdtitle']
        
}
</script>

<style lang="scss" scoped>
//@import '../../../assets/scss/_variables';

.page-page-headers {
	.page-header {
		margin-bottom: 50px;
	}
}
</style>

