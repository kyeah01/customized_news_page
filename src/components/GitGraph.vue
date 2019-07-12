<template>
    <div>
        <div id="graph-container"></div>
    </div>
</template>

<script>
const axios = require('axios');
// const graphContainer = document.getElementById("graph-container");
// const gitgraph = GitgraphJS.createGitgraph(graphContainer);

export default {
    data() {
        return {
            jsondata: ''
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
                const gitgraph = GitgraphJS.createGitgraph(graphContainer, options);
                const options = {
                   mode: "compact"
                    };
                // var array = ["kyeah01@gmail.com", "hs.ssafy@gmail.com", "hj123190@gmail.com", "hojin1357@naver.com", "jnunseok@gmail.com"]
                var master = ''
                var LHJ = ''
                var PHJ = ''
                var KYW = ''
                var KJS = ''
                var SHS = ''

                for (var i in jsondata.reverse()) {
                    console.log(i)
                 
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
                        KYW = gitgraph.branch("KYW")
                        KYW.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "hs.ssafy@gmail.com") {
                        master = gitgraph.branch("master")
                        master.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "hj123190@gmail.com") {
                        PHJ = gitgraph.branch("PHJ")
                        PHJ.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "hojin1357@naver.com") {
                        LHJ = gitgraph.branch("LHJ")
                        LHJ.commit(jsondata[i].title)
                    } else if (jsondata[i].author_email === "jnunseok@gmail.com") {
                        KJS = gitgraph.branch("KJS")
                        KJS.commit(jsondata[i].title)
                    }
                    
                }
            })
    },
    methods: {
        
    }

}
</script>