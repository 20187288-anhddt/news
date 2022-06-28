import cheerio from 'cheerio';

class BaseModel{

    constructor(res){
        this.res = res
        this.hostName = null
        this.articles = []
        this.init()
    }

    init(){}

    getHostNameUrl(){
        return "https://" + this.hostName + "/"
    }

    canParse(){
        return this.res.request.uri.hostname == this.hostName
    }

    normalizeTime(article){
    
        const day = article.dateCreate.split(" ")[0].split("/").reverse().join("/")
        const time = article.dateCreate.split(" ")[1]
        article.dateCreate = day + " " + time
    }

    parse(){}
}
export {crawlerModelClasses}
