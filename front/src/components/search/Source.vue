<template>
<v-card absolute fixed>
    <v-card-title primary-title>
        <v-layout row wrap>
            <v-flex xs12>
                <span class="headline">{{source.name}}</span>
                <follow class="follow" :news="source">
                </follow>
            </v-flex>
            <v-flex xs12>
                <v-layout row wrap>
                    <a href="#newUrl">{{source.url}}</a>
                    <v-flex xs12>
                        {{source.description}}
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card-title>
    <v-card-actions>
    </v-card-actions>
</v-card>
</template>

<script>
import follow from '../search/follow'

export default {
    props: ['source'],
    components: {
        follow
    }

}
</script>

<style>

</style>
