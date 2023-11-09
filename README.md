# Prompt-Bot
Discord bot for giving out daily prompts.

It prioritizes a user submitted list given in the input channel with "~submit" followed by whatever the user wants. Everytime it uses one of these, it takes it off the list until it's gone through them all. Then if the list is empty it'll pull from an unchanging list of spare prompts.

This was made for one server, the channel IDs are hard coded in and you'll need to modify the code for yours. I've left comments pointing out the two places these IDs go.
You'll also have to create a file named '.env' and put 'TOKEBN=youBotToken' in it.

Then just run 'npm install' in the directory you put these in to set up and start it up with 'npm start'

If you really like it, my ko-fi is here: https://ko-fi.com/altias
