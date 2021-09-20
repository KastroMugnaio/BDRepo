/**
* @name         YoutubeMusicSearcher
* @description  Search Spotify song in Youtube Music Based on OpenInYoutube .
* @source       https://github.com/KastroMugnaio/YoutubeMusicSearcher
* @author       KastroMugnaio
* @authorId 	324834831378808832
* @invite       gjR9rSb
* @version      1.0
* @updateUrl	https://raw.githubusercontent.com/KastroMugnaio/BDRepo/main/YoutubeMusicSearcher/YoutubeMusicSearcher.plugin.js		
*/

module.exports = class YoutubeMusicSearcher {
    getName() { return "Youtube Music Searcher"; }
    load() {
    }
    start() {
        activityPatch();
    }
    stop() {
        BdApi.Patcher.unpatchAll("YoutubeMusicSearcher");
    }
    observer(changes) {
    }
}

const UserActivity = BdApi.findModuleByDisplayName("UserActivity");
const activityPatch = () => BdApi.Patcher.after("YoutubeMusicSearcher", UserActivity.prototype, "render", (that, args, value) => {
    const instance = that;
    if (instance.props.activity && instance.props.activity.name === "Spotify") {
        const ytmusicButton = {
            className: "YoutubeMusicSearcher",
            style: {
                position: "absolute",
                top: "-3px",
                right: "53px",
                width: "25px",
                height: "25px",
                background: "url(https://i.imgur.com/X8le2B8.png) center/cover no-repeat"
            },
            onClick: () => {
                let songName = encodeURIComponent(instance.props.activity.details.replace(/;\s/g, " "));
                let songArtist = "+" + encodeURIComponent(instance.props.activity.state.replace(/;\s/g, " "));
                let url = "https://music.youtube.com/search?q=" + songName + songArtist;
                window.open(url, '_blank');
            }
        }
        value.props.children.push(BdApi.React.createElement("button", ytmusicButton));
    }
    return value;
});