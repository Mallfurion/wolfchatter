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