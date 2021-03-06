class Header extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            currentPage : elements.Wolf,
            error : null,
            isLoaded : false,
            data : {}
        }
        this.update = React.createRef()
    }

    componentDidMount(){
        //fetch("https://script.google.com/macros/s/AKfycby76cyIanXEIH9rCMnXxMC0L9vBwkz5lKtkhY-v4CtDD28bwoib8f3NHUPuDgjcK6AycA/exec")
        fetch("https://script.google.com/macros/s/AKfycbzVnZSIdHoMa5o_tVr7fHLyWwk_afnka9WyqCQtqTAHo8h_OoOwz8cc3sd_mlDV6eBc/exec")
        .then( response => response.json() )
        .then( result =>{ this.setState( {isLoaded : true, data : result } ) }
        )
    }

    // resetLoad(resetFunc){

    //     resetFunc(currentPage.name)

    // }

    clicked(value){
        this.update.current.resetProgress(value.name)
        this.setState( {currentPage : value } )
        
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="mx-auto d-sm-flex d-block flex-sm-nowrap">
                    <ul id="bar" className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <button
                        type="button" name="button" className="btn btn-dark"
                        onClick={ () => { this.clicked(elements.Wolf) } }>
                        Lobo</button>
                    </li>

                    <li className="nav-item">
                        <button
                        type="button" name="button" className="btn btn-dark"
                        onClick={ () => { this.clicked(elements.Eagle) } }>
                        Águia</button>
                    </li>

                    <li className="nav-item">
                        <button
                        type="button" name="button" className="btn btn-dark"
                        onClick={ () => { this.clicked(elements.Bear) } }>
                        Urso</button>
                    </li>

                    <li className="nav-item">
                        <button
                        type="button" name="button" className="btn btn-dark"
                        onClick={ () => { this.clicked(elements.Lion) } }>
                        Leão</button>

                    </li>

                    <li className="nav-item">
                        <button
                        type="button" name="button" className="btn btn-dark"
                        onClick={ () => { this.clicked(elements.Dragon) } }>
                        Dragão</button>
                    </li>

                    </ul>
                </div>

            </nav>

            <div>
                {
                this.state.isLoaded
                ?
                <Page 
                value={this.state.currentPage} 
                data={this.state.data}
                ref={ this.update }
                />
                :
                <div id="spin">
                    <div className="spinner-border text-light" role="status" />
                </div>
                }
                
            </div>

            </div>

        )
    }
}

var elements = {
    Wolf   : {bg:"img/bg/Wolf.png"   , badge:"img/badges/Wolf.png"   , title:"img/titles/Wolf.png"  , name:"Wolf"  },
    Eagle  : {bg:"img/bg/Eagle.png"  , badge:"img/badges/Eagle.png"  , title:"img/titles/Eagle.png" , name:"Eagle" },
    Bear   : {bg:"img/bg/Bear.png"   , badge:"img/badges/Bear.png"   , title:"img/titles/Bear.png"  , name:"Bear"  },
    Lion   : {bg:"img/bg/Lion.png"   , badge:"img/badges/Lion.png"   , title:"img/titles/Lion.png"  , name:"Lion"  },
    Dragon : {bg:"img/bg/Dragon.png" , badge:"img/badges/Dragon.png" , title:"img/titles/Dragon.png", name:"Dragon"}
}

class Page extends React.Component{

    constructor(props){
        super(props)
        this.state = { progress : 0 , fullyLoaded : false , prev : "Wolf"  }
    }

    checkProgress(){
        this.setState( {  progress : this.state.progress+1 } )

        if(this.state.progress >= 2){
            this.setState( {fullyLoaded : true} )
        }


    }

    resetProgress(val){
        if (val !=  this.props.value.name){
            this.setState( { progress : 0 , fullyLoaded : false } )
        }
    }

    render(){
        return( 
            <div className="bg">

                {this.state.fullyLoaded == false && 
                <div className="d-flex justify-content-center">
                    <div id="spinLoad" className="spinner-grow text-light" role="status" />
                </div>
                }

                <div style = { {"opacity" : this.state.fullyLoaded ? 1 : 0} } >

                    <div className="line">
                        <hr/>
                    </div>

                    <img 
                    className="bgImg" 
                    src={this.props.value.bg} 
                    onLoad={ ()=>{ this.checkProgress() } } 

                    />

                    <div className="badge" >
                        <img 
                        src={this.props.value.badge} 
                        onLoad={ ()=>{ this.checkProgress() } } 
                        />
                    </div> 

                    <div className="title">
                        <img 
                        src={this.props.value.title} 
                        onLoad={ ()=>{ this.checkProgress() } } 
                        />
                    </div>

                    <LineElement pos={"Up"} />
                    <TitleElement />
                    <LineElement />
                    <DataBody data={this.props.data[this.props.value.name]} size={ formatEntrySize(this.props.data[this.props.value.name].length )}/>
                </div>

            </div>
            )
    }   
    
}

function LineElement(props){
    return(
    <div className={ props.pos == "Up" ? "titleLineUp" : "titleLineBot"}>
         <hr/>
     </div>
    )
}

function TitleElement(){
    return(
        <div className="title-bar font">
            <h1>#</h1>
            <h1>Nome</h1>
            <h1>Pontos</h1>
        </div>
    )
}

class DataBody extends React.Component{
    constructor(props){
        super(props);
    }
    

    render(props){
        return(
            <div className="dataBody">
                {generateTemplate(this.props.data , this.props.size)}
            </div>
        )
    }
}

function Entry(props){
    return(
        <div style={ {height:props.h} } className={"entry " + props.value}>
            <h1 style={ {fontSize:props.fontsize} } >{props.pos}</h1>
            <h1 style={ {fontSize:props.fontsize} }  >{props.name}</h1>
            <h1 style={ {fontSize:props.fontsize} } >{props.points}</h1>
            <img className="bgImgLine" src="img/bgline.png" />
        </div>
    )
}

function generateTemplate(data , size){
    let content = []
    for (let i = 0; i < data.length ; i++){
        if (i % 2 == 0){
            content.push(
                <Entry
                key={i}
                pos={i+1}
                name={data[i][0]}
                points={data[i][1]}
                value="strong"
                h={ size.height }
                fontsize={size.fontSize} />
            )
        }
        else{
            content.push(
            <Entry
            key={i}
            pos={i+1}
            name={data[i][0]}
            points={data[i][1]}
            value="light"
            h={ size.height }
            fontsize={size.fontSize} />
            )
        }
    }

    return content
}


function formatEntrySize(len){
    let total = 1300
    let size = len
    const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

    let styles = {height:(total/size) , fontSize : clampNumber( (total/size) * 5 , 5 , 20)  }
    return styles 
}

class App extends React.Component{

    render(){
        return(
            <Header />
        )
    }
    
}

ReactDOM.render(
    <App /> , document.getElementById("root")
)