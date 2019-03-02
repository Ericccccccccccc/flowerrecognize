<template>
    <div class="row my-body-wrap">
        <div class="col-sx-12" style="height:100%;display:relative;">
            <slot> </slot>
        </div>
    </div>
</template>


<script>

export default {
    data: function() {
        return {

        }
    },
    template: "template"
}

</script>

<style scoped>

.my-body-wrap {
	height: 50%;
	text-align: center;
	margin: 0;
}

</style>
