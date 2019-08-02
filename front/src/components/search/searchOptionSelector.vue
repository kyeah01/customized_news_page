<template>
<div class="discover">
    <div class="tabs" style="height: 40px;">
        <div class="item" @click="goto('addcontent')">
            <span style="font-size: 16px;">
                <v-icon class="grey--text" id="rss">fas fa-rss</v-icon>Websites
            </span>
        </div>
        <div class="active item" @click="goto('addKeyword')">
            <span style="font-size: 16px;">
                <v-icon class="grey--text" id="google">fab fa-google</v-icon>Keyword alerts
            </span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        goto: function (addr) {
            this.$router.push('/' + addr)
        },
    }
}
</script>

<style>
.discover .tabs {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    margin-top: 36px;
}

.discover .tabs .item {
    color: #9e9e9e;
    cursor: pointer;
    /* display: inline; */
    display: block;
    float: left;
    font-weight: normal;
    margin-right: 16px;
    margin-bottom: -1px;
    border-bottom: 1px solid transparent;
}

input::-webkit-input-placeholder {
    color: #9e9e9e;
}

.fa-rss:before {
    width: 24px;
    margin-right: 4px;
}

.discover .description {
    color: #757575;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
}

.discover .tabs .active {
    color: #9e9e9e;
    cursor: pointer;
    /* display: inline; */
    font-weight: normal;
    margin-left: 1rem;
    margin-right: 1rem;
}

.fa-google:before {
    width: 24px;
    margin-right: 4px;
}
</style>
