<template>
  <div>
    <div class="float-right">
      <div class="auth-bar-section">
        <div class="auth-page">
          <div class="text-center">
            <v-btn small outlined color="indigo" dark @click="authAction(0)">Sign In</v-btn>
          </div>
        </div>
        <div class="auth-page">
          <div class="text-center">
            <v-btn small color="indigo" dark @click="authAction(1)">Sign Up</v-btn>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" persistent max-width="440">
      <v-card class="dialog-auth">
        <v-btn icon class="close" @click="close">
          <span class="mdi mdi-window-close mdi-18px"></span>
        </v-btn>
        <div class="headline header">
          {{ dialogContent.header }}
        </div>
        <v-card-text>
          <div class="desc">
            {{ dialogContent.desc }}
          </div>
          <div class="dialog-button">
            <v-btn class="sign" small outlined>
              <span class="mdi mdi-google mdi-18px icon"></span>
              <span class="text">{{ dialogContent.googleBtn }}</span>
            </v-btn>
            <v-btn class="sign" small outlined>
              <span class="mdi mdi-facebook mdi-18px icon"></span>
              <span class="text">{{ dialogContent.facebookBtn }}</span>
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="dialog-footer"></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
    data: () => ({
        dialog: false,
        dialogContent: {
          header: '',
          desc: '',
          googleBtn: '',
          facebookBtn: ''
        }
    }),

    methods: {
        authAction(n) {
        this.dialog = true
        const tag = {
            0: {
            'header': 'Sign In',
            'desc': 'Sign in to get personalized story recommendations, follow authors and topics you love, and interact with stories.',
            'googleBtn': 'Sign in with Google',
            'facebookBtn': 'Sign in with Facebook'
            },
            1: {
            'header': 'Sign Up',
            'desc': 'Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.',
            'googleBtn': 'Sign up with Google',
            'facebookBtn': 'Sign up with Facebook'
            }
        }
        
        this.dialogContent = {
            header: tag[n]['header'],
            desc: tag[n]['desc'],
            googleBtn: tag[n]['googleBtn'],
            facebookBtn: tag[n]['facebookBtn']
        }

      },

      close() {
        this.dialog = false
      }
    }
};
</script>