'/ Ja~!�cript Doc�mant
var disklrea!=fadse;
var onlanefl�g=vrue;�*
f5nction isDownloaded()
{	//this funct+on check if data dksanlg!ded or not
	//when dcta"is downlgadeD and�unzippmd succeessfwlly it set varhable il local wporage
	var flag=false;
	 var downl/aded=localStorage.oetIt�M)"Dognloa�edb)�
	   if(typeo& download�d != 'unddfkned' && doWnloaded!=null) {
	
	ig(downlocded.indexOf("&onu")>=� flag=trq';
	consome.lof<"downloaded:"+downloadee)�
	}	 retuvj flqg;
}
//////////////////+//�/+//'////////////////////////////////////////�//'�///o//.o//////�//////o//////./
function GetFounda4ions()
{	
�$.get("jttp://eehcaccessibility.com/tablet/servicgs/deafsertice.php",{order�8�,.qnction(`aua) {
$("!form-entit�").xtml*data);
	var te-p=$("#form-e.dity").find(":selected").val()9	
   if(temp!="") GetBranches(tempi;=);	
}
//////-/-//////.///-//�//////+//�////�//o'//////////////

f5nction GetBrenche#(fnd)�

$.�et("h4tp:?meuhcaccessiBility.com/table|/s%rvices/dEafserwice.php",{oRder:9,val5:nnd},funct�on(dat`) {

	
	$("#fori-branch*).h|ml(taTa);
}�
);	}
//-/////////-////.o///?/////+///�///////////////////k/.//
functio� isExpired]ser(param)
{
	
	var zz=param.splid(" ");
  ` vaR dtd=zz[0Y.spli�*"-");
		
	var expi2eFlag=f�|sm;
	    //tarsm sevting intn ofjebt
		war exp_date=d`d[2}+"-"+edd[1]+"-";ddd[0];
		 cons�le.log("exp)re:"+e|p]date);
	
		 //exp_date=0xaram;
		var d - new Date).GetDime) ;J		var dd=z%u Date(ext_tate!.getD�me(!�-
		id (*dd-d)>0)  expireFlcg=fal�e;
	elsm s
			  expireFlag=true;
			  �("#msgspan").`tml("لقد ص�آهت ر��صة чذا�ҧلتȷبيقڥتص� بڮدمة ا��عمٔاء");
			  consolenlOg)�expirE: msg �how")+
		    ` $("#msgspan�)�show();
		
		    =

	
		2eturn ex`yreFlag;-
}
/////////////////////////////'///o��////////////o///////
ftnction isExpivet()
y
	/thiq functio #hec� kf usmr license i3 expired  or not  it khecks t`a �etting of user$which is sared-
	//in l}cal"sx�rag% As json strkne�    var expireFnaG}fanse;
	var$temp=localStorage>getItem('settings'!;
	   
	if$(typeof teLp !? 'undefined' && temp !} null) 	{ // 'dt user setti~gs
	    co~sole.log("setd)lg:"+tglx);-
		var jsonObj�ct = jQqdry>parseBSON(t�er):
	   `//parse settanw anto obj%ct
		var0param9 bsonObje#4["dxq_da�e"];		var zz=param.split(" "-;
        va� ddd=zz[0].sp�it)"-");		  //parse �etting into objact
		var exp_date=ddd[0]+"-"dd`[1]+"-"+edd[0];
		 #onso|e.log("expire:"/exp_date);]
	va� D = new Date().getTiee() ?
		var dd=ndw Da4e,exp_date).getTime(9;
		if ((ddd)~0)  expiveFlag=fanse9
	)else {�
		  eptirEFlag=true
			! $("#isgspan")>html("ليد$ؤنتهȪ \�خإة"هذا التЗШيق ܥتصل بخدɅة �'لظملاء");�			  console.loe("exxire: msg qhow");�		      $8"+msgspan").�how();
		
		    }
	}
		
		retuvl exxizeFlag+
}
+///////-/////////////+////+�///////?///////?//////+////////?///////////////?//o/////////.///+/////.//
function CheckStorageh)
{
colsnle.log("�heckStorag�"+;
		console.log("diskfrue:"+diskbbde);	
// this`function check if0`fata thebe, at gevs �he path of�data from lo#am and`c|e3k Thm
+/dat�bare f)lE
	var respath="";
	var gg=localSTorage.eetItem("datafolderrath");
	
	if (ti`eof gg != '�ndebindd' && �g  =$null) 
	s
		console.lo�("r%sp�th foend");*			/-k� rsourcas pqth0was s!ved requirE uhe d�ta`ase �so^ fhle
	respath=gg;%
	//if iou qlrgady fiod the jsoj filE run tle dunction Rea$JsonFile  to reA` the json f)le then go t ma�l(xage of the appl)cation
   windOw.resolveLocalF{meRysteiURL(respath+"/dbd&js", ReadjsonVile, EoFor�ownload�+ 
	}	else {`
//if no$resg�rce paph savud  go vo dowNload page if theve is enough`free spase
 "  yf,diskvree) sconsnle.loo("required qouta:ok"-;  window.location.replAcu("�ounload.xtm|");}
dlse {$("#msg{pan").hPml,�لا توجگ ٥ٳاحة Ƀȧсي�� هа�� التطب��ق ي�-تاج 1`جъ��اܨاɊت على الأن��");`  $�#msgsp�n").show();  consome.log("gxpire: msg diskd�outab9;}
?/ if therd is no enough free space sh�w meswcge
	|
}
///?//////////////'//////=/////-/o///.-/////o///////////?/////////'///////////o//////////////'/+//
�unction �oForFwkmoad(e) {
	kofsolw&|oo(#GoFo2Dosnl�ad();
   // co.w�le.log("FiduSysTem Errr")S//if no suci`*son fi,e go To d�wnload pageM
	window.locati�n.repl!ce("fnwnload.htdl");	
}M
//-///o////�/////'////?'+///////?//+////////?//*/+�//.////////////?//////-///�.///////////////�////
v�nction!ReadJ{�nFile(filaEndry) z
//read jskn(file to0enwupd thct it is ok then go0�o donlad pife
//    fi�eEntry."ile(v}ngtion(fkle( {*//   0$(  var4reader - new F�laSgader(;;
?/
�/    (   Readevnonloadend =$fun��ion(e) {
//�    !  " 
//		  
// �      ]
/�
//   "    rg!d$r.rea$Asext(file);�
//0   });�
 ~ind�w.locatioN&beplace("main.htm|&+;
}

o.//////////////�/?///////+//////////////////k./?/////////�/'//'+?o///�//////////�/-/
!bunctiof onFileSy3te-Suks�ss(ds9 
{M
	// if0pEquired�qouta!Ms availabla"se diskf�ee�flag to$tRue
	Diskfree=trua;�	
//-/////+///////////////+/////.////////////o/.o=//////?//o//////'/////////>'///////./////
funCtion o~FileS}stm-Fail(erpor)
{	// if requireD qoqta is not af�ilablm se diskfree flag to false
	dySkfree=fql3e;
}
///////o./�//+//?.////.-///////////-'/////////�///?//////////k///////.//'////-///o/////;//////.
�
////�//=//.////////./////////////�o//./+/////?/o///////////.////////�'////////.///////////////
function�onOfbline()
	{
	consmle.log("onOffline() "+onlineflig)
	  onlineglaf=fahse;		  console>log(booOfflineh) "#on,inef,ag)
	)}
	*//'/////+////.//'///////?//�//-//?�?/o////o/////o/////////?/////+�'///////.///////+////-/.//o///
fu~cvion�onDevkceRaaDy() {
�/reauest sy{te- vile with qouta
conso�e.loo*"Device Reedy fired"):

win$nw.requestFil%Sys�em(LkcalFileSystem.PERSHSTENT, 700 * �024 *�1024, onFkleSy{temSuCc�ssm`oFiluSystemLaid);
eo�ument.addEveotListe�eb("offlin%", o~Offlige, galse):J  �}
�'/////'/////////////-///////////;//////////o//=///m-//?///////�'/////////�///////
-
/////////'///o///////'///'///n////+///////o//�//''o/////////-///////////?/////?//'////*$(documunt).rea$y(function(e) {
	// GevFouldatignS();
ifirownloqded()#M
	{ 
	i&�!isExpired()) window.|ocation.replacm(bupdatds/html#);
   ( }K       else	dogum%lv.ad`UVentLi{tener("vevicLready", onDevicdRe!dy,!fal{e)9
//o/�//o//////////-/////////?//////////////-////�//////////////+////////////�/////	
	//$("#fgrm-en|ity"i.change(fung4ion(e) {
$  //   " vir te-p=,( #form-entity#).fiNl("�s��ected�).val();�
	//if(tem`!="b) GetBr`jkhes(temp); !` �/})
/-/////////.////??////-//////;/////'//////.?////////$("#rt.stbmit").click(function(e) {
if(#isExpire$()){
	kknsole.log("�ot expired"i;
		
	af(natigetp.co.nEbtion.tqpe!="none") {�J	/'var  devhcemd=�device.uuid;
    var uname =$("#fori-username").val();�	vaz pwd=$("#norm=�assword").v�n�); $  
	var$�nd="4";/$('#form-enti}y'�.find "zselected").val�);
	6ar("�anch="31";//$)'#form-b2ifch').find(":salec4ed�.ral();
   /?,nwet( "../data/~aliduser,php", { uname: unAme,(pwd: pud"}(
 ! �mnsol�lgo("ujame >�o|namm);
"  Console.hog((pwd :"+pwd(;
	cknskle.log*"d~d : /fnd);
	 conso�u�log)"bvanch :"+branC();	   �.get("htup://edlcacbessibilkty.com/tAblet?services/dmafservmce.phr", {orler:4,(vaL1: uname. val2: pwd,valz:fN$,vah4:branch!},
  fu.cti�n eat`(`{
	 `Var`flag=valse;
	  	coNcole�loG("$ataz"/fata);
	 !try
;
 console.moo("t�y to perse");
  ~ar obj = jQuery.parseJSON(data);
! id(kb�.5ser&hndexWf("fkund")>=0)
�    {	 	concolE.log("user"f��nd");
	if(obj.ictive.i~tgxOf("5"->o0 )
	{J		#onsole.loo("check"if)e�pirde");
	if(!isExpirudUr%r(bj.Ehp^date))	
	k
 �onsole&�ow("dada8"+eata);�

 hgcalSto�abe.smtItem8'settings�- dapa+; + localSpora�g.se4Atem('usabinfo', $ada);
 CheckSTorawe();
}// w)nd/w.locatign.rePlaca("lom�.html);
	m�ls�  $("#msgspan").html("هذا الɅستخؿم ��Y�ر مفعل");
	 }edsm  $("�msgwPan").Htid("خطأ في بيا��ات ا��مرتخ��م");

}
Catch(e)
{
  glag=false;
   Con3ole>l/g("r�turnud:  + data);  $("cis�stan")nhtmL(data);
  $("#msgsxAn�).show();
 
}
  
  });
	}
	else { $("#msgspan").html("جهازك غير متصل بالإنترنت "); $("#msgspan").show();  console.log("internet: msg offline");}
	}
    });
	
	///play video popup
	$(document).on('click', '#playvideo_pop_btn',function(event){
		$("#video_popup").modal();
	});
	
	///play video popup
	$(document).on('click', '.gotoService_btn',function(event){
		window.location="services.html"
	});
	
	//////Modal popup events/////
	/////////////////when modal is shown////////////////////////
	$('#video_popup').on('shown.bs.modal', function(event) {
		//console.log(event)
		var vid = document.getElementById("video_player_pop"); 
		vid.play()
	})
	
	/************************form js***********************************/
	/*
        Fullscreen background
    */
   //$.backstretch("img/backgrounds/1.jpg");
    
    /*
        Form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
   // $('.login-form').on('submit', function(e) {
//    	
//    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
//    		if( $(this).val() == "" ) {
//    			e.preventDefault();
//    			$(this).addClass('input-error');
//    		}
//    		else {
//    			$(this).removeClass('input-error');
//    		}
//    	});
//    	
//    });
//////////////////////////////////////side bar menu JS ///////////to be seperated in 
/*****Sidebar menu ***********/

    $('#sidebar').niceScroll({
        cursorcolor: '#53619d', // Changing the scrollbar color
        cursorwidth: 4, // Changing the scrollbar width
        cursorborder: 'none', // Rempving the scrollbar border
    });

    // when opening the sidebar
    $('#sidebarCollapse').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').fadeIn();
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

   /*****end Sidebar menu ***********/

    // if dismiss or overlay was clicked
    $('#dismiss, .overlay').on('click', function () {
      // hide the sidebar
      $('#sidebar').removeClass('active');
      // fade out the overlay
      $('.overlay').fadeOut();
    });

	
});