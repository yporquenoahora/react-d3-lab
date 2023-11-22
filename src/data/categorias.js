
export const subcategorias = {
    "latin": [ "cumbia" ,"musica mexicana" ,  "gruperas inmortales" ,
    "psicodelia brasileira","salsa" ,
    "nu-cumbia" ,"bossa nova" ,
    "tropical" ,
    "tropical alternativo" , "spanish electropop","rock en espanol","mambo","classic italian pop","italian adult pop",
    "spanish new wave","spanish synthpop","spanish pop","rock en español","latin alternative", "dominican pop", "rap canario", "chilean rock",
        "urbano espanol","spanish electropop","rap latina", "rockabilly en espanol"
  ],
  "musica popular":["zolo", "musica tradicional cubana", "man's orchestra", "vocal harmony group"],
    
    "folk - country":[ "anti-folk" ,    "contemporary country" , "folk rock" ,    "folk" ,
    "country" ,"arkansas country" ,
    "outlaw country" ,
    "country dawn" ,
    "country road" , 
    "lancashire indie" ,"alternative rock","deep new americana","manitoba indie","cowboy western","canadian country","american modern classical","american folk revival","nashville sound",    
      "Alternative metal",  "rockabilly",    "Southern rock",    "Folk rock"],
    "indie":["indie cordoba", "canadian indie","olympia wa indie", "experimental indie rock","veracruz indie","quebec indie", "chilean indie","space age pop","granada indie" , "baltimore indie" ,    "indie catala"  ,   "singer-songwriter" , "cantautor" ],
    "punk - rap":["socal pop punk", "cyberpunk", "acoustic punk", "punk","riot grrrl" ,
    "dance-punk" ,"atl hip hop" , "rap politico" ,
    "queercore" ],
    "pop":["italian adult pop","spanish indie pop", "spanish noise pop","french indie pop","novelty","bubblegum pop" , "canadian pop","sunshine pop","baroque pop", "new romantic","europop","eurodance","mexican pop",
    "latin pop", "pop romantico", "latin arena pop", "new wave pop", "pop rock" ,"dance pop" ,
    "pop", "candy pop" , "art pop" ,
        
        "brill building pop" ,
        "power pop" , "sophisti-pop" ],
    "industrial":["industrial","industrial metal", "industrial rock", "nu metal", "post-punk","deep adult standards"],
    "electronica":["nu disco" ,"electropop","synthpop","acid house","chicago house","tech house",
      "new wave", "electroclash", "electro house", "pop electronico", "electronica",
      "filter house", "french indietronica", "french techno", "electro swing", "electrofox" ,
      "munich electronic" ,"hip house" ,   
      "electronic rock", "spanish electronic", "new French touch", "new rave" ,    "funk" ,
      "chillwave", "permanent wave" , "quiet storm" , "new french touch" ,  "swedish synth" , "indietronica" ,   "mpb" ,
      "hi-nrg" ],
      "jazz":["lounge","latin jazz","vocal jazz","jazz clarinet","easy listening","jazz blues", "soul jazz", "vocal jazz"],
        "soul - blues":["northern soul", "swing", "louisiana blues","new orleans blues","big band",
          "classic soul", "chicago soul", "british soul", "soul", "memphis soul" ,
          "soul blues" , "neo soul" ,
          "southern soul",  "torch song"   ],
    "rock":[
      "glam rock", "classic rock", "rock-and-roll", "rock","indie rock", "modern rock","spanish rockabilly","memphis blues",
      "classic rock", "soft rock", "album rock","hard rock", "beatlesque", "psychedelic rock",
      "brazilian rock", "glam rock", "art rock", "piano rock", "funk rock", "latin rock" ,
      "art punk", "rhythm and blues", "dance rock","Britpop","british alternative rock","tin pan alley",
      "british invasion","merseybeat"],
    "decades":[    "adult standards" ,"sunshine pop", "doo-wop" ,"disco", "Disco (70s)","mellow gold", "tropicalia",
      "New wave pop (80s)", "Punk (70s)", "Baroque pop (60s)",  "Classic rock (60s-70s)"],
    "moderno":["rap latina","bboy","modern rock","alternative dance","hip-hop experimental","rap marseille", "nu jazz",
    "deep latin alternative", "alternative metal"],
    "melodica":[
      "instrumental funk","novelty","exotica","laboratorio","library music",
      "classic soundtrack","movie tunes",  "cancion melodica" ]
  }
  //export const subgenerosPersonal = ["new wave", "punk español", "synthpop", "post-punk","nostalgia", "electronic rock", "psychedelic rock" ];
  export const colores = ["steelblue", "blue", "green", "yellow", "orange", "pink", "purple", "grey", "darkcyan", "violet", "brown", "purple", "silver", "gold"];
  export const numCategorias = Object.getOwnPropertyNames(subcategorias).length
  export const keysSubcategorias = Object.getOwnPropertyNames(subcategorias)


  export const getCategorias = ( c ) => {
    
    return c && c.replace("[","").replace("]","").replace(/'/g, '').trimStart().split(",")}

  export const getSubCategoria = ( cat ) => {
        for (const categoria in subcategorias) {   
            //console.log(categoria, cat, subcategorias[categoria])         
            if (subcategorias[categoria].includes(cat)) {
            return categoria;
            }
        }
        return "No se encontró una categoría para esta subcategoría";
        
    }