const pullRequestPayload = {
    "action":"opened",
    "pull_request":{
       "url":"https://api.github.com/repos/DingChiLin/ProjectMonitor/pulls/1",
       "html_url":"https://github.com/DingChiLin/ProjectMonitor/pull/1",
       "issue_url":"https://api.github.com/repos/DingChiLin/ProjectMonitor/issues/1",
       "title":"finish week_1_part_1",
       "user":{
          "login":"ArthurLinDev",
          "url":"https://api.github.com/users/ArthurLinDev",
          "html_url":"https://github.com/ArthurLinDev",
       },
       "body":"test PR",
       "created_at":"2020-03-26T08:20:20Z",
       "updated_at":"2020-03-26T08:20:20Z",
       "closed_at":null,
       "merged_at":null,
       "head":{
          "label":"ArthurLinDev:week_1_part_1",
          "ref":"week_1_part_1",
          "user":{
             "login":"ArthurLinDev",
             "url":"https://api.github.com/users/ArthurLinDev",
             "html_url":"https://github.com/ArthurLinDev",
          },
          "repo":{
             "name":"ProjectMonitor",
             "full_name":"ArthurLinDev/ProjectMonitor",
             "owner":{
                "login":"ArthurLinDev",
                "url":"https://api.github.com/users/ArthurLinDev",
                "html_url":"https://github.com/ArthurLinDev",
             },
             "html_url":"https://github.com/ArthurLinDev/ProjectMonitor",
             "url":"https://api.github.com/repos/ArthurLinDev/ProjectMonitor",
          }
       },
       "base":{
          "label":"DingChiLin:arthur_develop",
          "ref":"arthur_develop",
          "user":{
             "login":"DingChiLin",
             "url":"https://api.github.com/users/DingChiLin",
             "html_url":"https://github.com/DingChiLin",
          },
          "repo":{
             "name":"ProjectMonitor",
             "full_name":"DingChiLin/ProjectMonitor",
             "owner":{
                "login":"DingChiLin",
                "url":"https://api.github.com/users/DingChiLin",
                "html_url":"https://github.com/DingChiLin",
             },
             "html_url":"https://github.com/DingChiLin/ProjectMonitor",
             "url":"https://api.github.com/repos/DingChiLin/ProjectMonitor",
          }
       },
    },
    "repository":{
       "name":"ProjectMonitor",
       "full_name":"DingChiLin/ProjectMonitor",
       "owner":{
          "login":"DingChiLin",
          "url":"https://api.github.com/users/DingChiLin",
          "html_url":"https://github.com/DingChiLin",
       },
       "html_url":"https://github.com/DingChiLin/ProjectMonitor",
       "url":"https://api.github.com/repos/DingChiLin/ProjectMonitor",
    },
    "sender":{
       "login":"ArthurLinDev",
       "url":"https://api.github.com/users/ArthurLinDev",
       "html_url":"https://github.com/ArthurLinDev",
    }
}

const commentPayload = {
   "action":"created",
   "issue":{
      "url":"https://api.github.com/repos/DingChiLin/ProjectMonitor/issues/1",
      "repository_url":"https://api.github.com/repos/DingChiLin/ProjectMonitor",
      "html_url":"https://github.com/DingChiLin/ProjectMonitor/pull/1",
      "title":"finish week_1_part_1",
      "user":{
         "login":"ArthurLinDev",
         "url":"https://api.github.com/users/ArthurLinDev",
         "html_url":"https://github.com/ArthurLinDev",
      },
      "pull_request":{
         "url":"https://api.github.com/repos/DingChiLin/ProjectMonitor/pulls/1",
         "html_url":"https://github.com/DingChiLin/ProjectMonitor/pull/1",
      },
      "body":"Let's add this deleted line back."
   },
   "comment":{
      "url":"https://api.github.com/repos/DingChiLin/ProjectMonitor/issues/comments/608256340",
      "html_url":"https://github.com/DingChiLin/ProjectMonitor/pull/1#issuecomment-608256340",
      "issue_url":"https://api.github.com/repos/DingChiLin/ProjectMonitor/issues/1",
      "user":{
         "login":"ArthurLinDev",
         "url":"https://api.github.com/users/ArthurLinDev",
         "html_url":"https://github.com/ArthurLinDev",
      },
      "body":"fixed"
   },
   "repository":{
      "name":"ProjectMonitor",
      "full_name":"DingChiLin/ProjectMonitor",
      "owner":{
         "login":"DingChiLin",
         "url":"https://api.github.com/users/DingChiLin",
         "html_url":"https://github.com/DingChiLin",
      },
      "html_url":"https://github.com/DingChiLin/ProjectMonitor",
   },
   "sender":{
      "login":"ArthurLinDev",
      "url":"https://api.github.com/users/ArthurLinDev",
      "html_url":"https://github.com/ArthurLinDev",
   }
}

const mergePayload = {
   action: 'closed',
   number: 1,
   pull_request: {
      url: 'https://api.github.com/repos/DingChiLin/ProjectMonitor/pulls/1',
      html_url: 'https://github.com/DingChiLin/ProjectMonitor/pull/1',
      title: 'finish week_1_part_1',
      user: {
         login: 'ArthurLinDev',
         url: 'https://api.github.com/users/ArthurLinDev',
         html_url: 'https://github.com/ArthurLinDev',
      },
      body: "Let's add this deleted line back.",
      closed_at: '2020-04-06T05:17:29Z',
      merged_at: '2020-04-06T05:17:29Z',
      head: {
         label: 'ArthurLinDev:week_1_part_1',
         ref: 'week_1_part_1',
      },
      base: {
         label: 'DingChiLin:arthur_develop',
         ref: 'arthur_develop',
      },
      merged_by: {
         login: 'DingChiLin',
         url: 'https://api.github.com/users/DingChiLin',
         html_url: 'https://github.com/DingChiLin',
      },
   },
   repository: {
      name: 'ProjectMonitor',
      full_name: 'DingChiLin/ProjectMonitor',
      owner: {
         login: 'DingChiLin',
         url: 'https://api.github.com/users/DingChiLin',
         html_url: 'https://github.com/DingChiLin',
      },
      html_url: 'https://github.com/DingChiLin/ProjectMonitor',
      default_branch: 'master'
   },
   sender: {
      login: 'DingChiLin',
      url: 'https://api.github.com/users/DingChiLin',
      html_url: 'https://github.com/DingChiLin',
   }
}

const closePayload = {
    action: 'closed',
    number: 1,
    pull_request: {
       url: 'https://api.github.com/repos/DingChiLin/ProjectMonitor/pulls/1',
       html_url: 'https://github.com/DingChiLin/ProjectMonitor/pull/1',
       title: 'finish week_1_part_1',
       user: {
          login: 'ArthurLinDev',
          url: 'https://api.github.com/users/ArthurLinDev',
          html_url: 'https://github.com/ArthurLinDev',
       },
       body: "Let's add this deleted line back.",
       closed_at: '2020-04-06T05:17:29Z',
       merged_at: null,
       head: {
          label: 'ArthurLinDev:week_1_part_1',
          ref: 'week_1_part_1',
       },
       base: {
          label: 'DingChiLin:arthur_develop',
          ref: 'arthur_develop',
       },
       merged_by: {
          login: 'DingChiLin',
          url: 'https://api.github.com/users/DingChiLin',
          html_url: 'https://github.com/DingChiLin',
       },
    },
    repository: {
       name: 'ProjectMonitor',
       full_name: 'DingChiLin/ProjectMonitor',
       owner: {
          login: 'DingChiLin',
          url: 'https://api.github.com/users/DingChiLin',
          html_url: 'https://github.com/DingChiLin',
       },
       html_url: 'https://github.com/DingChiLin/ProjectMonitor',
       default_branch: 'master'
    },
    sender: {
       login: 'DingChiLin',
       url: 'https://api.github.com/users/DingChiLin',
       html_url: 'https://github.com/DingChiLin',
    }
}

module.exports = {
   commentPayload,
   pullRequestPayload,
   mergePayload,
   closePayload
};