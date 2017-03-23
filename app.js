
var express = require("express"),
    app     = express(),
    stream = express(),
    port1 = 5000,
    qs = require('querystring'),
    bs = require('body-parser');

var fs = require('fs');
var exec = require('child_process').exec, child;

//CORS middleware - Allow Cross Origin requests
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // NOT SAFE FOR PRODUCTION
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    next();
}
    app.set('view engine', 'jade');

    //bodyParser(); is now deprecated, so it is necessary to to call the specific functions
    //json() and urlencoded({})
    app.use(bs.json());
    app.use(bs.urlencoded({
      extended: true
    }));

    //use the allowCrossDomain function and bodyparsing for the stream and app objects
    app.use(allowCrossDomain);
    app.use(express.static(__dirname));

    /* retorna programa VRML convertido para X3D
    params: req(requisicao via POST do usuário)
    return: res - programa convertido para X3D */
    app.post('/', function(req,res){
        getStdin(req.body['value'],res);
    });

    /* renderiza o template index, visto pelo usuário
    que contém a interface do app */

    app.get('/views', function(req,res){
        res.render('index');
    });

    var write_user_input_to_file = function(content_string){
        var unique_filename = get_random_filename();
        var user_file = "bin/" + unique_filename + ".wlr";
        fs.appendFile(user_file, content_string, function(err) {
            if(err) {
                return console.log(err);
            }
        });
        return user_file;
    }

    var get_random_filename = function(filename){
        var filename = "";
        var possible_characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
            filename += possible_characters.charAt(Math.floor(Math.random() * possible_characters.length));
        return filename;
    }

    /* Recebe o programa VRML do usuário, processa e devolve o X3D
    params: message (mensagem mandada pelo requisitante ao child process)
    return: callback (mensagem do child process ao requisitante alertando 
    que já acabou de executar o processo externo (textX3D.jar))*/
    //TODO: refactoring pra melhor entendimento

    var getStdin = function(message, callback){
        var user_unique_file = write_user_input_to_file(message);  
        if (user_unique_file != null){
             var user_input = "java -jar bin/testX3D.jar " + user_unique_file + " bin/newfile.x3d";
        }
        else{
            console.log("file é null viu");
        }
        child = exec(user_input,
            function(error, stdout, stderr){
            
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);

                if (stdout != null){
                    //Retira a linha indesejada "[next .wlr line tal" do player na tela do usuario */
                    //retorna o resultado
                    callback.send(stdout);
                    console.log(stdout);
                }      
                if (error != null){
                    callback.send(stderr);
                    console.log('exec error: ' + error);
                }
        });
    };

    console.log('Request received');
    console.log('Server running at port:' + port1);

//app.listen(process.env.PORT);
app.listen(process.env.PORT || port1);