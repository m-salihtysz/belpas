# Build aşaması
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Proje dosyasını kopyala ve restore et
COPY *.csproj ./
RUN dotnet restore

# Tüm dosyaları kopyala ve derle
COPY . ./
RUN dotnet publish -c Release -o out

# Çalışma aşaması
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Belpas.Api.dll"]
