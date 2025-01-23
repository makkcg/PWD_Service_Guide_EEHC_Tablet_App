var onlineFlag=true;
var DeviceReady=false;
var fsize=512*1024*1024;
var failflag=false;
let ServerZipfilePath= "https://accessibility.eehc.gov.eg/public/uploads/tablet/zipfiles/";
let ServerTabServicesPath= "https://accessibility.eehc.gov.eg/public/uploads/tablet/services/";

////Logic 2025//////////
//1- check if local ZipDataFiles-Download is "first" to get the list of download filenames from updates in db 
//1-1 if ZipDataFiles-Download' is first , generate array of filenames to download and do the routin download
//1-2 update the ZipDataFiles-Download' to be the lates downloaded file name e.g data6 (row in updates in db )
//2- if not first , check the list of rows after the last file name stored in ZipDataFiles-Download' eg(data6) and create array of filenames to download e.g data7,data8 etc..
//2-1 start the download routine
//2-2 update the ZipDataFiles-Download' to the latest downloaded file name

//////////////DOWNLOAD UDATE ROUTINE///////
///////CHECK & CREATE LIST OF FILES ///////////// 
//1- check the local storage of list-zipfiles , if exsist complete the uncompleted status of the files if not start creating list if there is updates 
//1-get the ZipDataFiles-Download' value e.g data0 
//2 get the list of filenames after ZipDataFiles-Download' value and create local storage list-zipfiles : filenames, files sizes and status (0 not downloaded, 1 downloaded,2 unzipped, 3 deleted)

////CHECKING STORAGE ////
//3- calculate the total files sizes to download and show massage of space we needed 
//3- check the storage and get the file system ready for download (compare the freespace according to total sizes * 2) and show message
//4- check the online status 

///////DOWNLOADING /////////////
//4- get the localstorage if exist list-zipfiles and process it for files needs to download 
//5- create specific list for files needs to be downloaded 
//5- start the download of filese from the array ,show progress, pop the array of downloaded files after check their existance on data local system,  update the status in the list-zipfiles 

////////UNZIPPING After completed download of all files ///////
//1- create specific list of files needed to zip from list-zipfiles 
//6- start unzipping file after download, show progress 
//6- pop the array of unzipped files and update status of list-zipfiles with the unzipped files 

////////////DELETTING  After completeing unzipping files 
//1- create specific list for deleteing files from list-zipfiles to start deleting files
//7- delete all the zip files, pop the array after deleteing each file , update the list-zipfiles
//3- remove the local storage list-zipfiles 
//4- update the ZipDataFiles-Download with latest data(Number) after deleting it 

////set online flag according to internet status 
function onOffline()
{	
	console.log("onOffline() "+onlineFlag)
	onlineFlag=false;
	console.log("onOffline() "+onlineFlag)
}
function onOnline(){
	console.log("onONline() "+onlineFlag)
	onlineFlag=true;
	console.log("onONline() "+onlineFlag)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////


 function onFileSystemFail(evt) {
        console.log(evt.target.error.code);
		console.log("no qouta return back to login");
		/////////////////////////////23-4-2007//////////////////
		 var msg='<div style="font-size:16px;"><p>لاتوجد مساحة كافية</p></div>' ;
      	 $("#dialogbody").html(msg);
		 $("#myModal").modal('show');
		 window.location.replace("login.html");
		
    }
	
	function checkFileWithPlugin(filename) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
        dirEntry.getFile(filename, {}, 
            function(fileEntry) {
                console.log("File exists: " + fileEntry.fullPath);
            }, 
            function(error) {
                console.log("File not found: " + error.code);
            }
        );
    });
}


/////////////////////////////////////////////////////////////////New functions 2025////////////////////////////
function downloadFile(filename) {
    var destfile = cordova.file.dataDirectory + filename;
    var uri = ServerZipfilePath + filename;

    console.log("Preparing to download:", uri);
    
    // Step 1: Validate if the file exists on the server
    fetch(uri, {
        method: 'HEAD',
        headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("File not found on server: " + response.status);
        }
        console.log("File confirmed on server, starting download...");
        
        // Step 2: Start the actual download with progress tracking
        return fetch(uri, {
            method: 'GET',
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to download file: " + response.status);
        }

        // Step 3: Track progress with a stream reader
        const totalBytes = parseInt(response.headers.get('content-length'), 10);
        let receivedBytes = 0;
        const reader = response.body.getReader();

        $("#bardiv").show(); // Show the progress bar
        
        const stream = new ReadableStream({
            start(controller) {
                function push() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            console.log("Download complete! Inside reader function");
                            return;
                        }
                        receivedBytes += value.length;
                        let percent = Math.round((receivedBytes / totalBytes) * 100);
                        //console.log(`Download Progress: ${percent}%`);
                        $("#bardiv").html(`
                            <div class='progress-bar progress-bar-striped progress-bar-success active' 
                                style='width:${percent}%'>${percent}%</div>
                        `);
                        controller.enqueue(value);
                        push();
                    });
                }
                push();
            }
        });
        return new Response(stream).blob();
    }).then(blob => {
			console.log("✅ Download completed, preparing to save the file...");

			// Step 4: Write the file to the device safely using chunks
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
				console.log("Writing to directory: " + dirEntry.nativeURL);
				
				// Create or overwrite the file entry
				dirEntry.getFile(filename, { create: true, exclusive: false }, function(fileEntry) {
					console.log("File entry obtained for writing:", fileEntry.nativeURL);

					fileEntry.createWriter(async function(fileWriter) {
						console.log("File writer ready. Writing in chunks...");
						$("#details").html("<div class='' style='width:100%;padding:10px;'>Wait while writing the downloaded file...</div>")
						// ✅ Define Chunk Size
						const CHUNK_SIZE = 1024 * 1024; // 1 MB chunks
						const totalBytes = blob.size;
						let offset = 0;
						
						async function writeChunk() {
							if (offset >= totalBytes) {
								console.log("✅ File written successfully in chunks.");
								
								//alert("Download Complete!");
								//checkFileWithPlugin(filename); 
								$("#bardiv").hide();
								return;
							}

							// ✅ Slice the next chunk of data
							const chunk = blob.slice(offset, offset + CHUNK_SIZE);
							offset += CHUNK_SIZE;

							//console.log(`Writing chunk: Offset: ${offset} | Total: ${totalBytes}`);
							
							// ✅ Write the chunk and move to the next
							fileWriter.write(chunk);
						}

						// ✅ Write completion event
						fileWriter.onwriteend = function() {
							if (offset < totalBytes) {
								writeChunk(); // Continue writing the next chunk
							} else {
								console.log("✅ Final chunk written, file complete! "+ filename);
								$("#details").html("<div class='' style='width:100%;padding:10px;'>✅ Final chunk written, file complete! "+ filename+"</div>")
								//alert("File written completely! "+filename);
								checkFileWithPlugin(filename);
								$("#bardiv").hide();
							}
						};

						// ✅ Error Handling
						fileWriter.onerror = function(error) {
							console.error("❌ Error writing chunk:", error);
							alert("File write error: " + error.code);
							$("#bardiv").hide();
						};

						// ✅ Start Writing the First Chunk
						await writeChunk();

					}, function(error) {
						console.error("❌ Error preparing file writer:", error);
						alert("Error preparing file writer: " + error.code);
					});
				}, function(error) {
					console.error("❌ Error accessing file entry:", error);
					alert("Error accessing file entry: " + error.code);
				});
			}, function(error) {
				console.error("❌ Error resolving file system:", error);
				alert("Error accessing file system: " + error.code);
			});
		})
    .catch(error => {
        console.error("Error during download:", error);
        alert("Error: " + error.message);
        $("#bardiv").hide();  // Hide the progress bar on error
    });
}

///new function 2025 to check the file is downloaded and is existing /////
function checkFileWithPlugin(filename) {
    console.log("Checking if file exists: " + filename);

    // Ensure Cordova and the File plugin are ready
    if (!window.cordova || !cordova.file) {
        console.error("Cordova or the File plugin is not available.");
        alert("Cordova not ready or missing plugin.");
        return;
    }

    // Construct the full file path for checking
    var filePath = cordova.file.dataDirectory + filename;
    console.log("File path being checked: " + filePath);

    // Attempt to locate the file
    window.resolveLocalFileSystemURL(filePath, 
        function(fileEntry) {
            console.log("✅ File exists: " + fileEntry.nativeURL);
            //alert("File exists at: " + fileEntry.nativeURL);
			////after checking the file exist , unzip it 
			
			///remove the downloaded item from the download array 
			
			//update the local updateliststatus
			updateStatusInLocalStorage(filename, "downloaded");
			processDUDTasks("download");
			//UnZipFile2(fileEntry); 
        }, 
        function(error) {
            console.error("❌ File not found. Error Code: " + error.code);
            alert("File not found: " + error.code);
        }
    )
}

///////////////new unzip function 2025///////////////////
/* function UnZipFile2(fileName,listOfFilesToUnzip) {
    const sourcePath = cordova.file.dataDirectory + fileName;
    const destinationPath = localStorage.getItem("datafolderpath");

    console.log("Starting unzipping process for: " + sourcePath);
	
	$("#divalert").html("<strong>من فضلك إنتظر حتى يتم التنصيب</strong>"+"جاري تنصيب الملف رقم : "+listOfFilesToUnzip.length);
	$("#bardiv").show();
	
    // Check if the source file exists before proceeding
    window.resolveLocalFileSystemURL(sourcePath, function(fileEntry) {
        console.log("File found, proceeding with unzipping: " + fileEntry.nativeURL);

        // Progress bar setup
        $("#bardiv").show();
        $("#bardiv").html(`<div class='progress-bar progress-bar-striped active' style='width:0%'>0%</div>`);

        // Perform the unzipping with progress tracking
        zip.unzip(
            fileEntry.nativeURL,  // Source file path
            destinationPath,      // Destination directory
            function(status) {
                if (status === 0) {
                    console.log("✅ Unzipping successful for: " + fileEntry.nativeURL);
                    $("#bardiv").html(`<div class='progress-bar progress-bar-success' style='width:100%'>Unzipping Complete</div>`);
                    setTimeout(() => { $("#bardiv").hide(); }, 1000); // Hide progress after completion
                    
                    // List the directories after the unzipping
                    //listFilesInDirectory();

                    // Start the next download or handle success
                    console.log("File unzipped successfully "+ fileName);
					updateStatusInLocalStorage(fileName, "unzipped");
					processDUDTasks("unzip");
					
                } else {
                    console.error("❌ Unzipping failed. Status Code: ${status} " + status);
                    $("#bardiv").html(`<div class='progress-bar progress-bar-danger' style='width:100%'>Unzipping Failed</div>`);
					processDUDTasks("unzip");
                }
            },
            function(progressEvent) {
                // Handle unzip progress here
                let percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(`Unzipping progress: ${percent}%`);
				$("#bardiv").show(); 
                $("#bardiv").html(`<div class='progress-bar progress-bar-info' style='width:${percent}%'>${percent}%</div>`);
            }
        );
    }, function(error) {
        console.error("❌ File not found for unzipping: " + sourcePath, error);
        $("#bardiv").html(`<div class='progress-bar progress-bar-danger' style='width:100%'>File Not Found</div>`);
		//in case the file was not fount in memory , change its status and redownload it 
		updateStatusInLocalStorage(fileName, "pending");
		processDUDTasks("download");
		
    });
} */
function UnZipFile2(fileName, listOfFilesToUnzip) {
    const sourcePath = cordova.file.dataDirectory + fileName;
    const destinationPath = localStorage.getItem("datafolderpath");
    const tempUnzipPath = cordova.file.dataDirectory + "temp_unzip/";

    console.log("Starting unzipping process for: " + sourcePath);

    // Show progress message
    $("#divalert").html(
        `<strong>من فضلك إنتظر حتى يتم التنصيب</strong> جاري تنصيب الملف رقم: ${listOfFilesToUnzip.length}`
    );
    $("#bardiv").show();

    // Resolve the source file to ensure it exists
    window.resolveLocalFileSystemURL(
        sourcePath,
        function (fileEntry) {
            console.log("File found, proceeding with unzipping: " + fileEntry.nativeURL);
			$("#details").html("<div class='' style='width:100%;padding:10px;'>✅ File found, proceeding with unzipping: "+ "</div>")
            // Create or resolve the temporary unzip directory
            window.resolveLocalFileSystemURL(
                tempUnzipPath,
                function (tempDirEntry) {
                    startUnzipping(fileEntry, tempDirEntry);
                },
                function () {
                    // If temp directory doesn't exist, create it
                    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dataDirEntry) {
                        dataDirEntry.getDirectory(
                            "temp_unzip",
                            { create: true },
                            function (newTempDirEntry) {
                                startUnzipping(fileEntry, newTempDirEntry);
                            },
                            function (error) {
                                console.error("❌ Error creating temp unzip directory:", error);
                                showErrorAndContinue("Failed to create temp directory");
                            }
                        );
                    });
                }
            );
        },
        function (error) {
            console.error("❌ File not found for unzipping: " + sourcePath, error);
            showErrorAndContinue("File not found");
        }
    );

    function startUnzipping(fileEntry, tempDirEntry) {
        // Show progress bar
        $("#bardiv").html(
            `<div class='progress-bar progress-bar-striped active' style='width:0%'>0%</div>`
        );

        zip.unzip(
            fileEntry.nativeURL, // Source file path
            tempDirEntry.nativeURL, // Temporary unzip directory
            function (status) {
                if (status === 0) {
                    console.log("✅ Unzipping successful for: " + fileEntry.nativeURL);
                    $("#bardiv").html(
                        `<div class='progress-bar progress-bar-success' style='width:100%'>Unzipping Complete</div>`
                    );
                    setTimeout(() => {
                        $("#bardiv").hide();
                    }, 1000);

                    // Merge unzipped content into the destination directory
                    mergeUnzippedContent(tempDirEntry.nativeURL, destinationPath, function () {
                        console.log("✅ Merge complete, cleaning up temporary directory");
                        deleteTempDirectory(tempDirEntry.nativeURL, function () {
                            updateStatusInLocalStorage(fileName, "unzipped");
                            processDUDTasks("unzip");
                        });
                    });
                } else {
                    console.error(`❌ Unzipping failed. Status Code: ${status}`);
                    $("#bardiv").html(
                        `<div class='progress-bar progress-bar-danger' style='width:100%'>Unzipping Failed</div>`
                    );
                    showErrorAndContinue("Unzipping failed");
                }
            },
            function (progressEvent) {
                // Update progress bar
                const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                console.log(`Unzipping progress: ${percent}%`);
                $("#bardiv").html(
                    `<div class='progress-bar progress-bar-info' style='width:${percent}%'>${percent}%</div>`
                );
            }
        );
    }

    function mergeUnzippedContent(tempUnzipPath, destinationPath, callback) {
        console.log(`Merging content from ${tempUnzipPath} to ${destinationPath}`);

        // Resolve the destination directory
        window.resolveLocalFileSystemURL(destinationPath, function (destinationDirEntry) {
            // Resolve the temporary directory
            window.resolveLocalFileSystemURL(tempUnzipPath, function (tempDirEntry) {
                const reader = tempDirEntry.createReader();
                reader.readEntries(function (entries) {
                    let totalFiles = entries.length;
                    let processedFiles = 0;

                    if (totalFiles === 0) {
                        console.log("No files to merge.");
                        callback(); // Proceed if no files to merge
                        return;
                    }

                    entries.forEach(function (entry) {
                        if (entry.isDirectory) {
                            // Handle directories recursively
                            destinationDirEntry.getDirectory(entry.name, { create: true }, function (subDirEntry) {
                                mergeUnzippedContent(entry.nativeURL, subDirEntry.nativeURL, function () {
                                    processedFiles++;
                                    if (processedFiles === totalFiles) callback();
                                });
                            });
                        } else if (entry.isFile) {
                            // Copy file to the destination
                            entry.copyTo(
                                destinationDirEntry,
                                entry.name,
                                function () {
                                    console.log(`✅ File merged: ${entry.name}`);
									$("#details").html("<div class='' style='width:100%;padding:10px;'>✅ writing Unzipped files: "+ processedFiles+"</div>")
                                    processedFiles++;
                                    if (processedFiles === totalFiles) callback();
                                },
                                function (error) {
                                    console.error(`❌ Error merging file: ${entry.name}`, error);
                                    processedFiles++;
                                    if (processedFiles === totalFiles) callback();
                                }
                            );
                        }
                    });
                });
            });
        });
    }

    function deleteTempDirectory(tempDirPath, callback) {
        window.resolveLocalFileSystemURL(tempDirPath, function (dirEntry) {
            dirEntry.removeRecursively(function () {
                console.log(`✅ Temporary directory deleted: ${tempDirPath}`);
				$("#details").html("<div class='' style='width:100%;padding:10px;'>✅ Cleaning up ....: "+"</div>")
                if (callback) callback();
            }, function (error) {
                console.error(`❌ Error deleting temporary directory: ${tempDirPath}`, error);
                if (callback) callback();
            });
        });
    }

    function showErrorAndContinue(message) {
        console.error(message);
        $("#bardiv").html(
            `<div class='progress-bar progress-bar-danger' style='width:100%'>${message}</div>`
        );
        updateStatusInLocalStorage(fileName, "pending");
        processDUDTasks("download");
    }
}


// Delete the ZIP file after extraction
function DeleteFile(filename) {
    const filePath = cordova.file.dataDirectory + filename; // Construct the full file path

    // Resolve the file path
    window.resolveLocalFileSystemURL(filePath, function(fileEntry) {
        // Attempt to remove the file
        fileEntry.remove(function() {
            console.log(`File ${filename} deleted successfully`);
			$("#details").html("<div class='' style='width:100%;padding:10px;'>✅ Cleaning up ....: "+filename+"</div>")
            
			// Proceed to the next step after deletion
			updateStatusInLocalStorage(filename, "deleted");
			processDUDTasks("delete");
					
        }, function(error) {
            console.error(`File deletion error for ${filename}:`, error);
            //DownloadFail(error); // Handle deletion failure
			//processDUDTasks("removelocalstorage");
        });
    }, function(error) {
        console.error(`File not found for deletion: ${filename}`, error);
        //DownloadFail(error); // Handle file resolution failure
		updateStatusInLocalStorage(filename, "deleted");
		
    });
}

//function to update the status of the local stored files list 
function updateStatusInLocalStorage(zipfilename, newStatus) {
    // Remove .zip from the filename if it exists
    const normalizedFilename = zipfilename.endsWith(".zip") 
        ? zipfilename.slice(0, -4) 
        : zipfilename;

    // Retrieve the array from local storage
    let updateliststatus = JSON.parse(localStorage.getItem("updateliststatus")) || [];

    // Find and update the object with the matching zipfilename
    let found = false;
    updateliststatus = updateliststatus.map(item => {
        if (item.zipfilename === normalizedFilename) {
            item.status = newStatus;
            found = true;
        }
        return item;
    });

    if (found) {
        // Store the updated array back to local storage
        localStorage.setItem("updateliststatus", JSON.stringify(updateliststatus));
        console.log(`Updated status of ${normalizedFilename} to ${newStatus}`);
    } else {
        console.error(`zipfilename ${normalizedFilename} not found in updateliststatus`);
    }
}



//////////////////////////////////TEMP Additional functions to check the application data folder and files ///////////////

function listFilesInDirectory() {
    if (!window.cordova || !cordova.file) {
        console.error("Cordova or cordova.file is not available.");
        return;
    }

    // List the root directory first
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
        console.log("Root Directory: " + dirEntry.nativeURL);
        var directoryReader = dirEntry.createReader();
        
        // Read entries in the root directory
        directoryReader.readEntries(function(entries) {
            if (entries.length === 0) {
                console.log("No files or directories found in root directory.");
            } else {
                console.log("Root Directory Contents:");
                entries.forEach(function(entry) {
                    if (entry.isDirectory) {
                        console.log("[DIR] " + entry.name);
                        listFilesRecursive(entry); // Recursively list directories
                    } else {
                        // Fetch file size for files only
                        entry.file(function(file) {
                            console.log(`[FILE] ${entry.name} - Size: ${file.size} bytes`);
                        }, function(error) {
                            console.error("Error getting file size for: " + entry.name);
                        });
                    }
                });
            }
        }, function(error) {
            console.error("Error reading root directory: ", error);
        });
    });
}

// Recursive function to explore directories and list file sizes
function listFilesRecursive(dirEntry) {
    var directoryReader = dirEntry.createReader();
    
    // Read entries for subdirectories
    directoryReader.readEntries(function(entries) {
        if (entries.length === 0) {
            console.log("No files found in: " + dirEntry.nativeURL);
        } else {
            console.log("Contents of " + dirEntry.nativeURL + ":");
            entries.forEach(function(entry) {
                if (entry.isDirectory) {
                    console.log("[DIR] " + entry.name);
                    listFilesRecursive(entry); // Recurse further
                } else {
                    // Fetch file size for files
                    entry.file(function(file) {
                        console.log(`[FILE] ${entry.name} - Size: ${file.size} bytes`);
                    }, function(error) {
                        console.error("Error getting file size for: " + entry.name);
                    });
                }
            });
        }
    }, function(error) {
        console.error("Error reading directory: ", error);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////Temproray function to delete all files in application data folder except "files" and "documents"//////////
function deleteAllFilesExceptEssential() {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
        var dirReader = dirEntry.createReader();
        dirReader.readEntries(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isDirectory && (entry.name === "files" || entry.name === "Documents")) {
                    console.log("Skipping essential directory:", entry.name);
                } else {
                    if (entry.isDirectory) {
                        entry.removeRecursively(function() {
                            console.log("Deleted directory:", entry.name);
                        }, function(error) {
                            console.error("Failed to delete directory:", entry.name, error);
                        });
                    } else {
                        entry.remove(function() {
                            console.log("Deleted file:", entry.name);
                        }, function(error) {
                            console.error("Failed to delete file:", entry.name, error);
                        });
                    }
                }
            });
        }, function(error) {
            console.error("Failed to read directory contents:", error);
        });
    }, function(error) {
        console.error("Failed to access app data directory:", error);
    });
}
//////////////////////////////////////2025 modified code ////////////////////////////



// Start downloading sequence of files from server
function StartDownload(listOfFilesToDownload) {
	
	console.log("start downloading the list of files : "+listOfFilesToDownload)
	//check the connection 
    if (navigator.connection && navigator.connection.type !== Connection.NONE) {
		console.log("in startDownload internet works..")
		
        window.requestFileSystem(LocalFileSystem.PERSISTENT, parseInt(), 
		function(fileSystem){
			
			//set the file to download is the first file from the list 
			//var filename = ServerZipfilePath + listOfFilesToDownload[0];
			//var destfile = fileSystem.root.nativeURL + listOfFilesToDownload[0];

			//console.log(cordova.file.dataDirectory);
			//console.log("destfile "+destfile)
			
			localStorage.setItem("datafolderpath", cordova.file.dataDirectory);

			$("#divalert").html("<strong> من فضلك إنتظر حتى يتم التحميل </strong>"+" جاري تحميل الملف رقم : "+listOfFilesToDownload.length);
            $("#bardiv").show();
			//requestStoragePermission(function(){
			//	 console.log("Storage permissions granted. Proceeding with file operations...");
				 downloadFile(listOfFilesToDownload[0]);
			//})
			
			
		}
		, onFileSystemFail);
		
    } else {
		
        console.error("Device is offline, cannot start download. show alert and reload the app");
		
        $("#dialogbody").html('<div style="font-size:16px;"><p>الجهاز غير متصل بالإنترنت </p><p> لايمكن إستكمال عملية التنصيب</p></div>');
        $("#myModal").modal('show');
		
		alert(" الجهاز غير متصل بالانترنت يرجى التأكد من وجود انترنت وإعادة المحاولة! ");
		window.location.replace("index.html");
		
    }
}

///function to grant permission to the storage 
function requestStoragePermission(callback) {
    var permissions = cordova.plugins.permissions;
	
    var requiredPermissions = [
        permissions.READ_EXTERNAL_STORAGE,
        permissions.WRITE_EXTERNAL_STORAGE,
    ];
	
	if (cordova.platformId === "android" && parseInt(device.version) >= 11) {
        // Android 11+ requires MANAGE_EXTERNAL_STORAGE
        requiredPermissions.push(permissions.MANAGE_EXTERNAL_STORAGE);
    }
	
	permissions.requestPermissions(
        requiredPermissions,
        function (status) {
            if (status.hasPermission) {
                console.log("Storage permissions granted!");
				console.log("Storage permissions granted!  "+status);
                callback(); // Proceed if permissions are granted
            } else {
                console.error("Storage permissions denied by user. "+status);
                //alert("Storage permissions are required for the app to function.");
				callback();
            }
        },
        function (error) {
            console.error("Error requesting storage permissions: ", error);
        }
    );
	
}

//function to check the available size in internal storage for downloading and unzipping
function CheckInternalCapacity(allorsize , callback){ //options all: for the total required size, filesize in bytes to check e.g. 1024 means 1KB
	
	//get the total size to download from the localstorage
	var getTotalSizeToDownload = localStorage.getItem('updateliststatus');
	var sizetocheck = 0;//in bytes
	var multiplicationFactor = 2.5;//to reserve size for both unzipping and downloading 
	
	switch (allorsize) {
    case "all":
        sizetocheck = parseInt(getTotalSizeToDownload)*multiplicationFactor;
        break;
	default:
        sizetocheck = parseInt(allorsize)*multiplicationFactor;
        break;
	}
	 window.requestFileSystem(
        LocalFileSystem.PERSISTENT,
        sizetocheck,
        function (fileSystem) {
            console.log("Sufficient storage available.");
            callback(true,sizetocheck); // Enough storage available
        },
        function (error) {
            console.error("Insufficient storage. Error code:", error.code);
            callback(false,sizetocheck); // Not enough storage
        }
    );
	
}

// UPDATE STATUS FUNCTION Core function -  process the pending options: download,unzip,delete tasks and return list of files
function processDUDTasks(options){
	let storedArray = JSON.parse(localStorage.getItem('updateliststatus')) || [];
	let lastfiletodownload = storedArray[JSON.parse(localStorage.getItem('updateliststatus')).length-1].zipfilename
	let listoffiles = [];
	let totalsizetodownload=0;
	
	switch (options) {
    case "download":
        // Code to return the list of files to download
		//calculate the total file size of the pending download files and update the 
		//localStorage.getItem('TotalUpdatesSize')
		
		// Filter and map to get zipfilenames where status is 'pending'
		listoffiles = storedArray
			.filter(item => item.status === "pending") // Filter objects with status 'pending'
			.map(item => {
				totalsizetodownload += parseInt(item.filesize || 0, 10); // Add filesize to the total
				return item.zipfilename+".zip"; // Extract the zipfilename property
			});

		console.log("Total size to download:", totalsizetodownload);
		
		console.log("List of files to download:", listoffiles);
		//update the local storage total files sizes 
		localStorage.setItem('TotalUpdatesSize',totalsizetodownload );
		console.log(listoffiles.length)
		
		if(listoffiles.length>0){//their are files to download, call the download function 
		
			//check availabe internal space 
			CheckInternalCapacity(parseInt(localStorage.getItem('TotalUpdatesSize')),function(isEnough,requiredsize){
				if (isEnough) {
					console.log("Storage is sufficient. Proceeding...");
					
					///get the storage permission 
					requestStoragePermission(function(){
						 console.log("Storage permissions granted. Proceeding with file operations...");
						 // Call your next function here, e.g., StartDownload()
						 //downloadFile(listOfFilesToDownload[0]);
						 StartDownload(listoffiles);
					})
					
				} else {
					console.log("Storage is insufficient. Show alert to user.");
					// Notify the user or handle the storage issue
					alert("المساحة المطلوبة غير كافية يرجى افراغ مساحة كافية لتحميل الملفات وتشغيل التطبيق , المساحة المطلوبة : "+((requiredsize / (1024 * 1024)).toFixed(2))+"MB");
					window.location.replace("index.html")
				}
			});
			
		}else{//no files to download , check if their are files to unzip 
		
			console.log("All updated data files are downloaded")
			
			//set the ZipDataFiles-Download to the last downloaded file 
			
			localStorage.setItem('ZipDataFiles-Download',lastfiletodownload);
			
			console.table(storedArray)
			processDUDTasks("unzip")
		}
        break;
    case "unzip":
        // Code to return the list of files to unzip
		// Filter and map to get zipfilenames where status is 'downloaded'
		listoffiles = storedArray
			.filter(item => item.status === "downloaded") // Filter objects with status 'pending'
			.map(item => item.zipfilename+".zip");          // Extract the zipfilename property

		console.log("List of files to unzip:", listoffiles);
		if(listoffiles.length>0){//their are files to unzip, call the unzip function 
			
			
			
			//start unzipping the files 
			UnZipFile2(listoffiles[0],listoffiles);
		}else{//no files to unzip , check if their are files to delete 
			processDUDTasks("delete")
		}
        break;
    case "delete":
        // Code to return the list of files to delet
		// Filter and map to get zipfilenames where status is 'unzipped'
		listoffiles = storedArray
			.filter(item => item.status === "unzipped") // Filter objects with status 'pending'
			.map(item => item.zipfilename+".zip");          // Extract the zipfilename property
			
		console.log("List of files to delete:", listoffiles);
		if(listoffiles.length>0){//their are files to delete, call the update process completed function 
			
			//start deleting the files 
			DeleteFile(listoffiles[0])
			
		}else{//no files to delete ,  
			processDUDTasks("removelocalstorage");
		}
        break;
    default:
        // Code to Code to remove the localstorage after deleting the files , and removing the totalfile size
		listoffiles = storedArray
			.filter(item => item.status === "deleted") // Filter objects with status 'pending'
			.map(item => item.zipfilename+".zip");          // Extract the zipfilename property

		console.log("List of files to delete:", listoffiles);
		if(listoffiles.length>0){//their are files to delete, call the update process completed function 
			console.log("the deleted files in the list is "+ listoffiles.length)
			//set the ZipDataFiles-Download to the last downloaded file , remove the local storage updateliststatus and totalupdatedsize
			//get the latest downloaded file from the list 
			var lastfilenameDownloaded = listoffiles[listoffiles.length-1];
			if (lastfilenameDownloaded.endsWith(".zip")) {
				lastfilenameDownloaded = lastfilenameDownloaded.replace(".zip", "");
			}
			localStorage.setItem('ZipDataFiles-Download',lastfilenameDownloaded);
			localStorage.removeItem('updateliststatus');
			localStorage.removeItem('TotalUpdatesSize');
			
			//redirect the page to main.html to start using the app
			window.location.replace("main.html") 
		}else{//no files to delete ,  
			
		}
        break;
}

}

///function to check for latest updates from server, and create the download array store it in the localstorage
function checkLatestUpdatesServer(lastupdated){
	//check if their is uncomplted updates tasks from before by checking the localstorage updateliststatus
	var ispendingTasks = localStorage.getItem('updateliststatus');
	console.log(ispendingTasks)
	
	if(typeof ispendingTasks!= 'undefined' && ispendingTasks != null){//if their is pending tasks 
		//resume downloading,unziping,deleting pending tasks
		processDUDTasks("download");
		
	}else{//if their is no pending tasks
		
	//show message in downloads screen we are checking for any updates
		//$("#divalert .topmessage").html("<p>جاري التحقق من وجود تحديثات في المحتوى .......</p>")
		$("#divalert .topmessage").html("<p></p><p style='text-align:center;font-size:1.5em;direction:rtl;width:100%;'> جاري التحقق من وجود تحديثات في المحتوى ....... </p>");
		
	//get the updates and store to the localstorage
	
	let updatelistArr=[];
	let totalupdatessize=0;
	
			$.ajax({
				url: ServerTabServicesPath + "deafservice.php",
				type: 'GET',
				data: { order: 16, val1: lastupdated },
				timeout: 5000, // Timeout set to 5 seconds (adjust as needed)
				success: function(data) {
					console.log("Received updates JSON response:", data);

					// Log specific details if necessary
					if (Array.isArray(data) && data.length > 0) {
						console.log("Received updates:");
						data.forEach(update => {
							console.log("ID:", update.id, "Updated Zip File:", update.updatedzipfile, "Timestamp:", update.timestamp, "FileSize:", update.filesize);

							updatelistArr.push({
								id: update.id,
								zipfilename: update.updatedzipfile,
								filesize: update.filesize,
								status: "pending", // Default status; update later as needed
								timestamp: update.timestamp
							});
							totalupdatessize += update.filesize;
						});
						console.log("updatelistArr: ", updatelistArr);
						console.table(updatelistArr);
						console.log("Total updates size: ", totalupdatessize);

						// Store the list of updates to localStorage
						localStorage.setItem('updateliststatus', JSON.stringify(updatelistArr));
						// Store the total size of download files
						localStorage.setItem('TotalUpdatesSize', totalupdatessize);
						// Get the list of files to download from local storage
						processDUDTasks("download");
					} else {
						console.log("No updates found or empty response.");
						//alert("لا يوجد تحديثات للمحتوى يمكنك الاستمرار وتشغيل التطبيق");
						$("#divalert .topmessage").html("<p></p><p style='text-align:center;font-size:1.5em;direction:rtl;width:100%;'> لا يوجد تحديثات للمحتوى يمكنك الاستمرار وتشغيل التطبيق </p>");
						setTimeout(function() {
								window.location.replace("main.html");
						}, 6000);
					
					}
				},
				error: function(xhr, status, error) {
					console.error("AJAX request failed:", status, error);

					// Handle the case where no internet connection is available
					if (localStorage.getItem("ZipDataFiles-Download") !== null) {
						
						$("#divalert .topmessage").html("<p></p><p style='text-align:center;font-size:1.5em;direction:rtl;width:100%;'>لايوجد اتصال بالانترنت للتحقق من التحديثات  </p>");
						window.location.replace("main.html");
					} else {
						$("#divalert .topmessage").html(" <p> لايوجد اتصال بالانترنت لتحميل محتوى التطبيق، يرجي الاتصال بالانترنت واعادة المحاولة </p>");
						setTimeout(function() {
							window.location.replace("index.html");
						}, 3000);
					}
				}
			});

			/* $.get(ServerTabServicesPath + "deafservice.php", { order: 16, val1: lastupdated })
				.done(function(data) {				
						console.log("received updates json response:", data);

						// Log specific details if necessary
						if (Array.isArray(data) && data.length > 0) {
							console.log("Received updates:");
							data.forEach(update => {
								console.log("ID:", update.id, "Updated Zip File:", update.updatedzipfile, "Timestamp:", update.timestamp, "FileSize:", update.filesize);
								
								updatelistArr.push({
									id: update.id,
									zipfilename: update.updatedzipfile,
									filesize: update.filesize,
									status: "pending", // Default status; update later as needed
									timestamp: update.timestamp
								});
								totalupdatessize +=update.filesize
							});
							console.log("updatelistArr : "+ updatelistArr);
							console.table(updatelistArr);
							console.log("Total updates size: "+totalupdatessize)
							// updatelistArr.forEach((item, index) => {
							//	console.log(`Object ${index + 1}:`, item);
							//}); 
							
							//store the list of updates to localStorage 
							localStorage.setItem('updateliststatus', JSON.stringify(updatelistArr));
							//store the total size of downloads files 
							localStorage.setItem('TotalUpdatesSize',totalupdatessize );
							//get the list of files to download from local storage 
							processDUDTasks("download")
							
						} else {
							console.log("No updates found or empty response.");
							alert("لا يوجد تحديثات للمحتوى يمكنك الاستمرار وتشغيل التطبيق");
							window.location.replace("main.html")
						}
					
				})
				.fail(function(xhr, status, error) {
					// Handle errors during the AJAX request
					console.error("AJAX request failed:", status, error);
					//check the localstorage ZipDataFiles-Download if exist redirect to main , else redirect to index
					if(localStorage.getItem("ZipDataFiles-Download")!==null){
						$("#divalert .topmessage").html("<p>لايوجد اتصال بالانترنت للتحقق من التحديثات</p>")
						window.location.replace("main.html")
					}else{
						$("#divalert .topmessage").html("<p>لايوجد اتصال بالانترنت لتحميل محتوى التطبيق، يرجي الاتصال بالانترنت واعادة المحاولة</p>")
						setTimeout(function(){ window.location.replace("index.html"); }, 3000);
						
					}
					
				}); */
}//end if there is no pending updates 
}
////////////////////////
function onDeviceReady() {
	 DeviceReady = true;
	console.log("Device ready in download")
	var updates;
	////1- check if local ZipDataFiles-Download is "first" to get the list of download filenames from updates in db 

	var ZipDataFilesDownload = localStorage.getItem('ZipDataFiles-Download');
	
	if(ZipDataFilesDownload == "first"){ //first time download , get the zip file list from db to download 
		//get all the updates set updates=all
		console.log("ZipDataFiles-Download exist and set to first")
			var updates = "all";
			
			checkLatestUpdatesServer(updates);
		
	}else if (typeof ZipDataFilesDownload == 'undefined' && ZipDataFilesDownload == null){//if the ZipDataFilesDownload is not defined or null go back to login  
		console.log("ZipDataFilesDownload is null or undefined redirect to login "+ZipDataFilesDownload)
		//redirect back to login 
		window.location.replace("index.html");
		
	}else{// get the latest updates after the value in ZipDataFilesDownload 
		console.log("ZipDataFilesDownload exist and has the value "+ZipDataFilesDownload)
		updates = ZipDataFilesDownload;
		checkLatestUpdatesServer(updates);
	}
	
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////


$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});