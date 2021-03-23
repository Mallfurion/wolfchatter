# Wolfchatter

## requirements
* nodejs
* npm

## setup
```
sudo npm i -g @nrwl/nx
npm i
```

## start postgres docker
```
docker-compose -f apps/api/docker-compose.yml up -d
```

## run
```
nx serve api
nx serve client
```
or
```
nx run-many --target=serve --projects=api,client --parallel
```

---

## add API resource
```
nx g @nestjs/schematics:resource --sourceRoot=apps/api/src/app <name> --no-spec
```

## add CLIENT component
```
nx g c <name>
```

## ERD Diagram
![erd](https://lh3.googleusercontent.com/4-Bae-cqBabjt4oA48GtXbrcuqbUJBRNQbIJxJBJ905QCUyC4eb_6T9Dcb6JrXMhYQ34AaXFanUTuQHxvbfZSIOQhld5rauNCKCb8FDGGXxVJH63cnN83sMUJOkpjuCOkANF22GWjjfhPKLh29Q01gzL792XZzSkKo_FAPd48PA1hT_ruHf2zjZSXZ-orVlqxkMlVlMoBCwsmpxfuEKtB5Ms_bkRMT-tkdSPButFKVnofjJxQ1uwA7NhVQY3c11gTTPsXWbGb84uXRIx6_dMikU5lsoLZ2spqxW3_WUlVj2Q7EmleZVhxasOHaVlAVdFc6JmpEOi0dirnLi4KPpOkEM8KxyePgjoMI2niJ7lBkgdT-S1fIxawJOgvLY4NiRJtBpsidJSc5o9ewVw4FHoFsnpMz-m9hKCD8X33umDVQKgxiSJjuRJ5JTEYo5mfm4p1XEbkemWuJz9pTo0mQEj8GvmYW416_i5X91WGz8eMIxyhIYHv0kkS99eeUvB0rlQvj0WugHoF1F3395HGk4-i-UOW_vygTkJ9GbdA_CXXYUsLekpfA7P9vVJqTIn6uFzfJ597Rkw_AF7F9_9k0bfCoGnu4cex2ZtCoMqQwCwCSImZFyutBhlQmeKLnBMC8QFETI3dJC9J304k7W4Gyjt9XPCqvVpm0QsBrcrNy5upEdBOqEx_eTOjBzx8w2P-zZxkIGu3uBaHWEwb4ZRmMvUjCrF=w2656-h1170-no?authuser=0)