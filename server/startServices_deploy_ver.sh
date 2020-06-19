# ./server/ 로 이동 후 실행해야한다. 
# 해당 스크립트 디렉토리에 env파일이 있어야 한다. 
# package.json을 가지고 있는 디렉토리를 찾고 해당 디렉토리에서
# npm update를 실행한 후에 백그라운드로 모듈을 실행한다. 

NODE_LIST=`find ./ -type f -name package.json | grep -v node_modules`  
for node in $NODE_LIST 
do     
	echo find ${node%package.json}     
	path=${node%package.json}index.js
	# npm update --prefix ${node%package.json} 
	
	if [ -f $path ]; then
		echo index.js파일이 존재함
#		nodemon $path &
		IFS=/ read -ra ary <<<"${node%package.json}"

		name=${ary[-1]}
		echo name is ${name}
		pm2 start $path --name $name
	fi
done
