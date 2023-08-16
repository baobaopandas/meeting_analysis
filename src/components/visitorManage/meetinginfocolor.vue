
<template>
    <div class="page-home snap-parent">
        <div picture="../images/m1.png"></div>
        <img :src="imgUrl">
        <img :src="imgUrl2">
    </div>
</template>

<script>

    import imgUrl from "../images/m1.png"
    import imgUrl2 from "../images/m2.png"
    export default {
        name: "meetinginfocolor",
        components: {
        },
        data(){
            return {
                imgUrl:imgUrl,
                imgUrl2:imgUrl2

            }
        }
    };

</script>

<style></style>

