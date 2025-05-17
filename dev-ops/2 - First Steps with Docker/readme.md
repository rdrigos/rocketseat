## Iniciando com containers

### O que é um container?

- Disponibiliza um ambiente isolado
- Compartilha um host

### Principios do Isolamento

1. Namespaces

   - Namespaces são responsáveis por isolar recursos do sistema. Cada namespace cria uma "visão" separada de um recurso para o processo. Tipos mais usados:
   - PID namespace: isola a árvore de processos. O processo dentro do container vê o PID 1 como se fosse o processo inicial.
   - NET namespace: cada container tem sua própria pilha de rede (interfaces, IPs, roteamento).
   - MNT namespace: isola os pontos de montagem (sistemas de arquivos).
   - UTS namespace: permite que o container tenha seu próprio hostname.
   - IPC namespace: isola comunicação entre processos (System V, POSIX).
   - USER namespace: isola IDs de usuário e grupo (UID, GID).
     cgroup namespace: isola o acesso aos control groups.

2. CGroups (Control Groups)

   - cgroups controlam quanto de recursos um grupo de processos pode usar. Isso inclui:
   - CPU (quantos núcleos e tempo de processamento)
   - Memória (limites de uso, swap, OOM)
   - Disco (I/O)
   - Rede
   - Número de processos

3. Unshare
   - unshare é uma chamada de sistema (syscall) usada para criar um novo namespace isolado. Com ela, um processo pode "desanexar-se" de um namespace e criar o seu próprio. Ferramentas como Docker e criadores manuais de containers (como runc ou comandos com unshare) usam isso para iniciar ambientes isolados.

### Open Container Initiative (OCI)

A OCI (Open Container Initiative) é uma especificação aberta que define padrões para containers. Ela nasceu para padronizar o ecossistema de containers (evitando lock-in em Docker, por exemplo).

1. OCI Runtime Specification
   - Define como criar e executar containers.
   - Exemplo: o runc é um runtime que segue essa especificação.
   - Especifica o formato de bundle (config.json + sistema de arquivos rootfs).
2. OCI Image Specification
   - Define como deve ser o formato de uma imagem de container.
   - Exemplo: como as camadas de imagem são empacotadas, metadados, hashes etc.
   - Ferramentas como containerd, cri-o e Docker seguem essa especificação.

## Criando nossa primeira imagem

- Obs: Imagem disponivel em: `/source/first-image`
- Para melhorar o tamanho da imagem, podemos configurar o `.dockerignore`

### Tags Dockerfile

| Tags    | Description                                                        |
| ------- | ------------------------------------------------------------------ |
| FROM    | Imagem base a ser usada                                            |
| WORKDIR | Diretório de trabalho dentro do container                          |
| COPY    | Copia arquivos ou diretórios do host para o container              |
| RUN     | Executa comandos durante a construção da imagem                    |
| EXPOSE  | Informa a porta que o container escutará em tempo de execução      |
| CMD     | Define o comando padrão a ser executado quando o container iniciar |

### Comandos

| Contexto                      | Comando                                               |
| ----------------------------- | ----------------------------------------------------- |
| Listar imagens                | `docker image ls`                                     |
| Listar containers em execução | `docker ps`                                           |
| Buildar imagem                | `docker build -t [Nome da imagem]:[Tag: 1.0.0] .`     |
| Rodar (Preso no Console)      | `docker run --rm -p [Porta]:[Porta] [Nome da imagem]` |
| Rodar                         | `docker run -p [Porta]:[Porta] -d [Nome da imagem]`   |
