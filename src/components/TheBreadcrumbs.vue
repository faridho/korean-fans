<template>
    <div class="float-left">
        <v-breadcrumbs class="breadcrumbs" :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
    </div>
</template>
<script>
export default {
    props: {
        breadcrumbs: Array 
    }
};
</script>