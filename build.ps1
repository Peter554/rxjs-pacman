function BuildDocs {
    param (
        [string] $SiteUrl,
        [string] $ProjectName
    )

    $Here = $PSScriptRoot
    $Project = Join-Path $Here $ProjectName
    $Dist = Join-Path $Project (Join-Path dist $ProjectName)
    $Docs = Join-Path $Here docs
    
    Push-Location $Project
    ng build --prod --base-href $SiteUrl
    Pop-Location
    
    if (Test-Path $Docs) {
        Remove-Item $Docs\*
    } else {
        New-Item -Path $Docs -ItemType Directory
    }

    Copy-Item $Dist\* $Docs
}

BuildDocs -SiteUrl "www.foo.com" -ProjectName "web-ui"