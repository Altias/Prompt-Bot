require("dotenv").config();

var fs = require('fs');

var prompts = [];
var sparePrompts = ["Explosion","Human Shield","Gunpoint","Isolation","Stab Wound","Unconscious",'"Dont move"',"Adrenaline","Scars","Trembling","Hallucination","Bleeding Out","Secret Injury","Humiliation","Abandoned","Beaten","Recovery","Embrace","Rain","Lazy Morning","First","Sad","Stargazing","Drunk","Hurt","Flowers","Competing","Seduction","Falling","Ballroom","Watching","Summer","Reversal","Snow","Warmth","Sorry","Exhaustion","Alone","Dream","Tea","Full Moon","Soup","Fairytale","Smile","Mist","Cabin","Hot Chocolate","Sleeping","Cuddle","Leaves","Shadow","Thankful","Music","Cozy","Frost","Ephemeral","Nemesis","Serenity","Scion","Dawn","Revere","Eloquence","Zenith","Lullaby","Secrets","Desire","Doubt","Distance","Fair","Endings","Faith","New Beginnings","Patience","The Fall","Silence","Tears","Gamble","Stuck","Defense","Warmth","Curiosity","Passion","Balance","High Stakes","Decisions","Objective","Home","Swift","Divided","Poison","Underwater","Sword","Shy","Screech","Run","Shattered","Teeming","Fierce","Mysterious","Graceful","Filthy","Cloud","Furious","Blind","Squeak","Climb","Fall","United","Found","Mask","Mistakes","Journey","Story","Past","Future","Love","Fear","Wings","Gone","Alone","Lost","Shield","Gods","Heros","Enemies","Blood","Wounds","Scars","Sick","Baking","Training","Traveling","Past","Future","Return","Farewell","Stories"];


const Discord = require("discord.js");
const client = new Discord.Client();

function updatePrompts()
{
	rawPromps = fs.readFileSync('prompts.json');
	prompts = JSON.parse(rawPromps);

	console.log("Current Prompts:");

	for (var i = 0; i < prompts.length;i++)
	{
		console.log(prompts[i]);
	}
}

updatePrompts();

client.once("ready",() =>{
	console.log("Online!");
});

client.login(process.env.TOKEN);

function morning(hasToday)
{

  var now = new Date();
  var hr = 12;
  var min = 00;
  console.log(now);
  console.log("Prompts at " + hr+":"+min+" UTC");
var millisTill2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hr, min, 0, 0) - now;
if (millisTill2 < 0 || hasToday == true) {
     millisTill2 += 86400000;
}


  setTimeout(function(){

    //Output channel ID
    const channel = client.channels.get("ID HERE");
	
	  var chosen = "";

    	  if (prompts.length == 0)
	  {
		channel.send("The prompt list is empty! Consider submitting your own! Today's prompt is randomly chosen from the spare list.");

		  chosen = sparePrompts[Math.floor(Math.random()*sparePrompts.length)]

	  }
	  else
	  {
		var randIndex = Math.floor(Math.random()*prompts.length);
		console.log(randIndex);

		if (randIndex == 0)
		  {
			chosen = prompts.shift();
		  }
		else
		  {
			 chosen = prompts.splice(randIndex,randIndex);
		  }

		save = JSON.stringify(prompts);
                fs.writeFile('prompts.json', save, err => {
                if (err)
                {
                        console.log("Error");
                }
                else
                {
                        console.log("List saved!");
                }
                });

	  }

    channel.send("Today's prompt: " + chosen);
    morning(true);

  }, millisTill2);
}

morning(false);

client.on('message', msg => {

	var messageL = msg.content.toLowerCase();
	
	//Input channel ID
	if (messageL.includes("~submit")&& msg.channel.id == "ID HERE")
	{
		var input = msg.content.slice(8);

		var promptsCaps = prompts.map(function(x){ return x.toUpperCase(); });

		if (promptsCaps.indexOf(input.toUpperCase()) != -1)
		{
			msg.channel.send( "This is already on the list!");
		}

		else
		{
			prompts.push(input);
		
			save = JSON.stringify(prompts);
			fs.writeFile('prompts.json', save, err => {
			if (err)
			{
				console.log("Error");
			}
			else
			{
				console.log("Added!");
			}
			});
		
		
			msg.channel.send("Your prompt '" + input + "' has been added to the list!");
		}
		
	}

});
