# Script para comprimir e redimensionar imagens para tamanho web

param(
    [int]$MaxWidth = 1920,
    [int]$MaxHeight = 1080,
    [int]$Quality = 85
)

Add-Type -AssemblyName System.Drawing

function Compress-Image {
    param(
        [string]$ImagePath,
        [int]$MaxWidth,
        [int]$MaxHeight,
        [int]$Quality
    )
    
    try {
        $image = [System.Drawing.Image]::FromFile($ImagePath)
        $originalSize = (Get-Item $ImagePath).Length / 1MB
        $extension = [System.IO.Path]::GetExtension($ImagePath).ToLower()
        
        $ratio = [Math]::Min([float]$MaxWidth / $image.Width, [float]$MaxHeight / $image.Height)
        
        $newWidth = [int]($image.Width * $ratio)
        $newHeight = [int]($image.Height * $ratio)
        
        $bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        
        $image.Dispose()
        $graphics.Dispose()
        
        # Se for PNG, converter para JPEG (muito mais compressão)
        if ($extension -eq '.png') {
            $jpgPath = $ImagePath -replace '\.png$', '.jpg'
            $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            $currentQuality = $Quality
            
            while ($currentQuality -gt 10) {
                $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
                $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $currentQuality)
                $bitmap.Save($jpgPath, $encoder, $encoderParams)
                $newSize = (Get-Item $jpgPath).Length / 1MB
                
                if ($newSize -le 1) {
                    break
                }
                $currentQuality -= 5
            }
            
            $bitmap.Dispose()
            Remove-Item $ImagePath -Force
            $imagePath = $jpgPath
            $finalSize = (Get-Item $imagePath).Length / 1MB
            $reduction = [Math]::Round((1 - $finalSize / $originalSize) * 100, 1)
            $orig = [Math]::Round($originalSize, 2)
            $final = [Math]::Round($finalSize, 2)
            Write-Host "  OK: Convertida para JPG: $orig MB -> $final MB (qualidade: $currentQuality%, reducao: $reduction%)" -ForegroundColor Green
        }
        else {
            # Para JPEG, apenas reduzir qualidade
            $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            $currentQuality = $Quality
            
            while ($currentQuality -gt 10) {
                $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
                $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $currentQuality)
                $bitmap.Save($ImagePath, $encoder, $encoderParams)
                $newSize = (Get-Item $ImagePath).Length / 1MB
                
                if ($newSize -le 1) {
                    break
                }
                $currentQuality -= 5
            }
            
            $bitmap.Dispose()
            $finalSize = (Get-Item $ImagePath).Length / 1MB
            $reduction = [Math]::Round((1 - $finalSize / $originalSize) * 100, 1)
            $orig = [Math]::Round($originalSize, 2)
            $final = [Math]::Round($finalSize, 2)
            Write-Host "  OK: $orig MB -> $final MB (qualidade: $currentQuality%, reducao: $reduction%)" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "  ERRO: $_" -ForegroundColor Red
    }
}

function Compress-WebImages {
    $assetsPath = ".\assets"
    
    if (-not (Test-Path $assetsPath)) {
        Write-Host "ERRO: Pasta '$assetsPath' nao encontrada!" -ForegroundColor Red
        return
    }
    
    Write-Host "`n=== COMPRESSAO DE IMAGENS PARA WEB ===" -ForegroundColor Cyan
    Write-Host "Tamanho maximo: $($MaxWidth)x$($MaxHeight)px" -ForegroundColor Yellow
    Write-Host "Qualidade: $Quality%`n" -ForegroundColor Yellow
    
    $images = Get-ChildItem -Path $assetsPath -Recurse -Include *.jpg, *.jpeg, *.png, *.gif, *.bmp
    
    if ($images.Count -eq 0) {
        Write-Host "Nenhuma imagem encontrada" -ForegroundColor Yellow
        return
    }
    
    Write-Host "Encontradas $($images.Count) imagem(ns)...`n" -ForegroundColor Yellow
    
    $processed = 0
    
    foreach ($image in $images) {
        Write-Host "Processando: $($image.Name)" -ForegroundColor Cyan
        
        $sizeMB = $image.Length / 1MB
        if ($sizeMB -gt 1) {
            Compress-Image -ImagePath $image.FullName -MaxWidth $MaxWidth -MaxHeight $MaxHeight -Quality $Quality
            $processed++
        }
        else {
            $sizeFormatted = [Math]::Round($sizeMB, 2)
            Write-Host "  OK: $sizeFormatted MB (dentro do limite)" -ForegroundColor Green
        }
    }
    
    Write-Host "`n=== CONCLUIDO ===" -ForegroundColor Cyan
    Write-Host "Total processadas: $processed`n" -ForegroundColor Green
}

Compress-WebImages
