<template>
    <v-container>
        <v-btn v-on:click="Open('https://lab.ssafy.com/HSx3/webmobile-sub2/network/master')">그래프</v-btn>
        <v-layout>
            <v-flex class="hidden-sm-and-down"> 
                <div id="graph-container"></div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
const axios = require('axios');

export default {
    data() {
        return {
        }
    },
    mounted() {
        axios.get('https://lab.ssafy.com/api/v4/projects/6064/repository/commits?per_page=100', {
                    headers: {
                        'PRIVATE-TOKEN': 'KyjLocxYqV5AV5wjBBUo'
                    }
                }
            ).then(res => { 
                var jsondata = res.data
                const graphContainer = document.getElementById("graph-container");
                const metroTemplateWithoutAuthor = GitgraphJS.templateExtend("metro", {
                    commit: {
                        message: {
                            displayAuthor: false,
                        }
                    }
                })
                const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
                    template: metroTemplateWithoutAuthor,
                });
                var master = ''
                var LHJ = ''
                var PHJ = ''
                var KYW = ''
                var KJS = ''

                for (var i in jsondata.reverse()) {
                    if (jsondata[i].title[0] === "M") {
                        var parent_id = jsondata[i].parent_ids[0]
                        var jsondata_id = ""
                        for (var j in jsondata) {
                            if (jsondata[j].id === parent_id) {
                                jsondata_id = jsondata[j].author_email
                            }
                        }
                        if (jsondata_id === "hs.ssafy@gmail.com") {
                            master.merge(master)
                        } else if (jsondata_id === "hj123190@gmail.com") {
                            master.merge(PHJ)
                        } else if (jsondata_id === "hojin1357@naver.com") {
                            master.merge(LHJ)
                        } else if (jsondata_id === "jnunseok@gmail.com") {
                            master.merge(KJS)
                        } else if (jsondata_id === "kyeah01@gmail.com") {
                            master.merge(KYW)
                        }
                    } else if (jsondata[i].author_email === "kyeah01@gmail.com") {
                        if (!KYW){
                            KYW = gitgraph.branch("KYW")
                        }
                        KYW.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "hs.ssafy@gmail.com") {
                        if (!master){
                            master = gitgraph.branch("master")
                        }
                        master.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "hj123190@gmail.com") {
                        if (!PHJ){
                            PHJ = gitgraph.branch("PHJ")
                        }
                        PHJ.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "hojin1357@naver.com") {
                        if (!LHJ){
                            LHJ = gitgraph.branch("LHJ")
                        }
                        LHJ.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "jnunseok@gmail.com") {
                        if (!KJS){
                            KJS = gitgraph.branch("KJS")
                        }
                        KJS.commit(jsondata[i].title)
                    }
                    
                }
            })
    },
    methods: {
        Open(url) {
            var win = window.open(url, '_blank');
            win.focus();
        }
    }

}
</script>

<style>
#graph-container {
    overflow:scroll;
    overflow:auto;
    white-space:nowrap;
    width:100%; height:700px;
    padding:10px; 
}
</style>
