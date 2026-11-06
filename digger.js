/* ==== DATOS DE DIGGER: sprites GIF, sonidos WAV y las 60 salas — extraídos
   del remaster de Lutz Roeder (github.com/lutzroeder/digger, MIT). ==== */
var DIGGER_RES = {
  fuente: 'R0lGODlhEACwA5EAAAAAAP///////wAAACH5BAEAAAIALAAAAAAQALADAAL/lI+py+0Po5y02ouz3jb4AH3gI4af6aGjU5Ind7XsC9dZmy74muyMbwsKh8SiBqhAHkRMmqDZTL5y0hy1N+UhlAYoc+t1drM/svFcllzBYV77yl2aq2F2vWHVYsd2bx86o6Z3JiNnJ3VoiAU3uBexptOI6JIIVvmkVwhZiIYJSVfGCKqY+Ok5YmrpqKoKxJjHdzo5tunmBCur+CqGScubSgTMiie52nmMnKxcIUxKLKgS7dLM+fxYPEu5PNQcC30tSM07OiP+HQi+rc4hGjlMTmz6ZtsWip2b5jzcvd5/aS+tXKN5f6JEEofwXjV/DBs6NHFOG0SJFB9aNFJvEaCL/xw7enS4UGPAePc+RkSHsqK7dClbrpzoMp/JGHcK3vqVpVaedjttxVLS01uvU7V8FZXjR6PBmSqALRU5dFTCkQCnKRwHlU5SoxuZHuyKFGzIoC9JjsxocxfVrxnn8euINuzTsaiwyvtCkl/IUnbr3k2bqaZXq2v/CLyLS2rgdpd0vuG6NavZwfbauvVVWKnYx9em4nNEF7BWvJRHV4u7N2zTzaj7Yl4Z+vM+wZCxenXrl7PAzK93T/ZdFfjv4aXZkpZ7PHbs2o7nupat6/lyoseZlzQZ1/q/6H+h/3xufVfk4MOzU09dvDh67+m3w2sPXzVhdevr25b//mv8cFed3v/vrd98vOEnIHH7UWaeeUUkSNuBTNmn13/s5UchgeRV6B58DEamHHgBCoehhclAeF0NG7I2UG75eJaSK/TUxdVsmrzIGHUy3mSYM2pBt8NbNzTYWncdCindZedtNGSKALbiIYK6HTkjkVIKRpCI3025YpFBNqgekFRqqeSEVkp24YegeXjiU12OB+VigW234yRJZomlMafRWF2bB+IWXk79/cnhkyQOuKRxSfGZHqKKSkhioFsSKmahIUrqYJrJgUnnn2fhFaWfmcqkp2brfTQnbJiaWuWidcp5KqurGrPmlwpGSuugBZY5KXtV9ukgmWbi6muuPYZZqqthaieqhKT/4gTni+981lxfahLo2LN3NpshWdk4yaKBwjIKbrfAZgjYsLPOVOyZncYo37BXqjhUuky+Oi+xTQ4mL3fM2qgujPoKpW288H5XqLtQ5StUrNM+iqq99P7b8KcRl2XpqB7t2mac/UpsbKaOyqrprb/2GqpoYwZcL8cbRyVwYi379DKTJs/MkkpBYIxzqyt33PDHH2dz7ckDw1pazpaJm1ee5wZ7sM43LswlvkYiSu6YVVN6da3hhgyihk5DzHPYO4+d8sRiP6101Ld9/a7KZZ8NNtk64igZYvdNG6vbcb8td9tm9x1zLmQBRXdjJXKEMMszwmO3f6nhjRx51c79cMJSIqPjX8HOEh3Ha45z7S3TWVuM7tRGjmu11p8PaGtld1BNRAEAOw==',
  sprites: 'R0lGODlhQAQgAPcAAAMCBefpXZICBcoPGWcPx4/gQSdr082HGy3nwMocu88RePPw+S7RVwQCjwoFtn18gP///////////////////////////////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAQAQgAAAI/wABCBxIsKDBgwgTKkwYIICAhwIaPmwoMaJDixMvViQ4oKPHjxw/ilxIsqDIkyNLqkTpMSRLlTBjypxJs6bNmzhz6hS4oOcCgj6DCu25s6jRo0iTKl3KtKnTp1CjSp2qkAGDBlizat3KtatVB2DDPhj7IKzZs2TLnqV6s2LGjBXjapz70CVKuyeNsnxZdO8AvCnZCh5MuHDCoECHKjbMuLHjx5AjS55M2abVrpgza/2KluzZzw7SfhZMoLRplW8xqpabWi5JvkhBwpQd+y5OihQrK8XdcCfvAL55Ex7KU2hxxT4NH1jOfHnO5s11H4XO/Dn1A9Kza9/OPTHihVitiv8fT768+asNQKtfr5606dKoV9OV33rua9u1O8akfRS2zd/d6QSggMIRiNtwxgFAnILIJVfYddjhBGGAN00o4XUUZqjhhlItqFB454UoIlbslViiVO+lmKJCv0EEEWsuxrhRQvoBIFuNKimg44483hiYSSl9xOOQCuzn1180/XYgh4Qpmdt/TgIHpZMkfXfcTwU16CBC0R3UpUoQWghmmNTVJKZNZ8ZEZpkwrQmdmRheyOZMXxZUJ0l3DpSnQnsC0CeX1XkZ6JjOCVoooREa9Kehido5qExEMRjphw2Mp5lmljYwlomilTgWiiqGyiJvMdJX6osXKVSjjzER2WNLNv7/CJhAQrqqo5F+1RSllEwKtmtbUQJL5UJWSoqldw3y+ShBiyrq5rILPQstos2WlGab0jaKZ7ZwzolmnHRO66e4gB7qqLnboqsnuYyWq2204lbLbLzsOquuQPIeFGmxCIF42aWYZbqpp54RDFWoCJ92EFzzyYXbqRYhtKptOB5kq0FHIonxkQZdTGPGsKrUG0O8wjQyQif3ClXKBrFckssEwTzQgh7K+Wy6jbqJ87xkqsktttL63PO6954bJs/v2nsz0EtTu6bQTVv7s9NDU3000zpj/TRN+26ZEIj+imge2OmFptZnnQ6MNlkHJ4wwQgzXx7BbMpYcEq0Ua2yxqxvn/3pQxh3z/THIepMks0CHkzyqylIlnjjKdheUOM0JWhc0vOZmrWzmW1t97eZR43xmtZqPWzTSpYveudSXew4u66FjHjvoqcteO+2rx9T1pF9Xip7YIZINltqdDUy8WWk55fbyBBgEscMXuQhjXX/rzV/Fgd86uPUhA1kxf9kXuT3gsLdu++yMms94UtmKW+x3yF3JO76Pjk4v51UnVOftRqP+urv+85bqvEW61RUwfwe8Gv2K1r7Pma6Bfdrf6yJYvwneL2cWZCAE35S+DeoOS/w6CNkyhSnxkK1Ta0vL8cTCtqYwz23OOxX0SjU9AUiMe98rXEF4pKrugW8g1+te+P96SDjXOVBp6tNfA9fHFAgi5H0Oip+x5vfAAGJQg/hToBKzeESiXVGLAPRiF5GYwaQZzX6nE2MZB8jBBZpxg208owfbpcYshtGNEsTiF/P4RjheEI4fvBJJRmjCS2XqXygsngrVk7ylvPCFMYueqWBUwxva5W5J+SHesNcXwumQjO3DXSi3OEd3OZGJOaGclpB1xwfykY1jlGP+Wsk/pFkxX3jM3flmucs4JhCNffRjMP1IyzXSMZd2PKYrK6hHK9qyg6d8opamSRBChu081tRUwVK4SNA0UimPZF4kpdewcqaGehu7JBA/qRNNxoqTO/EkO2+JPmRODZr3BGU+Ucn/tQRN81jGKiYB67VMXooSjMqspRfpmUZ9xpKhcYQlM80I0Wc6dJ/2HKXSnLnQhBpzo3X8okB9+cdS6uufyRpINoGXzUQiT4UrHF4LwRlOGA5EbpOkSNwg0kNLLsWd7ownx3oZzaYIM09HhVZSG0oZKBbnqQySH0AvKkCtMZWN3aonPh+KT8tF1KoIPShXM/o/opZVrGclpUKp+lW0VtWtbc0SCFFas5UWMmwtPdt6XOrNBzClpjYVCE4pqVOL0K2n1WMKUIXYn6HCNYlKWeq7JMtWyGbHqVHN7O68VlmCmtKzvczqWmUZ1vKB9qCi1eVjT1vQ0n7WoGpVbWxh+1rX/241rbWN5Wbpyju7/guvvjuhXhm5zb36NSmAhSQACPu8wtbnPnlprH8AE1SbTFeZcAoQLpXoRut090KVCSE/x0ve8pr3vDoJYc2gKhC7Avdf8EWPieYLGpom16bMlaFz5QNdWbVzLze8bk4E3D/wdme7gPpuhSKEYEGFl7PojbCEJ0zh8aq3cjMDqHt9F99s0vfDYbHvfd8jEPgAAKfkHKwkFVKAFrv4xS3OCYxhHJMZv1jGNr4xyXbFYyVVGHI9DvKThExkKRVZyFKtGV0RgoAmO/nJUIbyTKLc5JxQGQFWpnKWo7xlKePkyl1+cpidPOUrm7nKCznzmUmiZjOzuf/NWk4znLks5zmLuc52RrM0pbjKgmz4kL8LNIkUyanigkXEIzaxiVGMKhW7iMU5djGOc1zjSE/a0js+8q9+3DJN8xhxnt50qDf9T2T12SB5vnNMwPzlON+E1a92tU1gPWtZ14TWt7Z1SVJNZjzn+c28Bnaqhf1rX9uZ2Mc+TEpPrdLgOju+HX62fAlNsBUiGrAlXtGJG23YueR3RgKJtLhpvJBxj5sg5hY3SdJ97oGMOljLfbePOS05eQ/I3gNa8hQXcxA9A6DNBPE3k9Wc6zXTBOAHJ3irDV5mhssE4Q13c0JU/W+FC0TgA/E3xCuOcY1bnONYznivL/5xjJM84CX/DzmqVQ5yWpu84ih3+MulKUjwSBu47xV02WRqvOGysOdmuXZNs03ibddnhjlFJwDYre5yM33G6H46uSEt9anHG99DxvqT6O1urY/M6yPTd6n7zfKNz1zkDl/1x9WedphsvOASjziu3b52urc95mVP+cDx7vKRi5zvsqa44PVOdsDT+eSFR3vcYZ54ksuc5VWaKxUN4lv05Fx4P1dLTM0G9BA7MtHZJshO6XZ0b6dqIDFGfbvDXYB1t171lFZ91KMee9a7nvaYtn29gdVp3u8eSlyHnO8TI1Xia3auAw/2w3Utd7/DneLPd37CD19r6kf/7CqZO9vhjOy7TzzZzfe+/+G5b+w5d5/8gQyozaPN0pvvnPPd5GYi/wp6AJhYsN0+J7cfln8byh72ubd0rwdpuAd1/6d7rFd7Anh7AKiAqRdJw9d1EQhqExh8FAh8clV8GQZVXZN8w7Z81jd9XhZrIRh+kCeC0IeC0meCY4Z95bd4Hvh2L6h9uwZ+36d8CsFrLqiDJxh5NUcp7Cc2HpZ5fMVz8ecA9Dd09qdtoKZ/o2d6riGAOmZuCShpB2GATUeFUmhjVfiABYGF7WaAkRRqo0KGmaZpZehpFqgS67VwMAiCI1h9cXh9PQiHKciCbniHdriCe+iCOVh32QeINSh+M8iH56eHh2iIheiHcsVbU/8FAIT0W5kBaINmhEUIf/P3eUqoIuOkGuREWPw3MmCYhVZXgK9HiqjIhVvohabYhaoohl1nhkCmhmd4ZGmIhmsYeeIlhzQYiCXYh3W4fYhod3Oogoz4h78ojIroi8WojMm4iMEIjXQ4jMj4hszYi9IIKY74iJFoeZNYSP/yUjBFXOPoeUmobYqmMPfXdY7miahyWAlhAPI4j/QojzlRj/UYE/hIj/e4j/wIVrT1FEW1WvkykBSiSgDFZxgmEAnQkA75kBAJkTnRkDsRkQ9ZExaZkQlAEhrZkRK5EBSpEx05Ex75kQpRkiWpEihpkRy5kiaZEC75kggRkxcJkjQZkif/eZMbaZM3qYvIp351JW3AUx6YJ44+x02j4UKisoRE1zxMWW/tSHr9p3QG4Y//eBNWaQD6aJX9mJVQY1lQYZC5ZVsQ9VbdgZCmFkULCQA6uZM3gZM4MZI0EZMt2ZZwOZNuGZcaSZIuWZd2qZI66Zd0yZM0KZh9SZiDmZM9iZiHqRDwI3mQ2VtCOZSU+H5GWGjW9hTpyIlLuI6ix20pVjdPWJVZyZUwUZr7iBCoiY9buZr5KDXKUl5pdFWOEpsyMZsUtRRQ9Ji7CWFtOZF5+ZbByZbD2ZKAmZPCaZwiOZx3WRLNiZfIaRPPWRC/yZgraZjXaZ0oiZ3bqZ0p6Z0e6Zhq/9lnC4JzALMVmQJiINY2TVl0RRdDTuiOpZcRpOmaV1kS9jmPqpmfWnma/GmPsMld5IWb4WKbPmOgUdGbu5WQa1mdybmcBjGd0amc0CmdxUmdF8qXEZqhMMmhBCGhxPmgilmY4CmXI5qYHbqYJ9qYKUqiK5qdexaZ/FaeHOaN55kV6ame9AUq7smEB0E3/Fd6QHp6BHGf+wmgKmGkBaGkAsGkA+GkR9qfCgGlt5WLqdVg9LRguoVhvCNF7IWhIMqQDgmcFcmcHnoQYToQIJqmE9qhZbqhGuqcHMqmbkqY3PmhLGmnaJqnI+qXd6qmfNqifqqnfUqoGbhvNfdP10SZwf+jTZh5lJ3Bo+roo532iZIEPUNKlQBApU2qn/6JpAfhpFTKqUvqqVNqqqaFpVYakBKlpbiVYZiVZAyKl2lakyKql3AqE3S6pmfaphVKphgapxS6p7dKq2eakXgakYO6ocpqqMb6p2LarIU6rYLqrHs6nQuaqNO0qIw6No5abZD6Uu7xngvRXN92qU/ijyShrqGamvFon6fKmu0qr/H6mqqzE2ZppVqDr3FFczAxeWAqk9cqsMZqq7oaqGIKrTaZrAQLE7WKsA5rptJapwpLpwU7psQ5sVKBrHo5sRxLFR+bsQ3LsAYbshdrsTQhiTdaQjJFjpoHqd80FZxJEuZqTu5ouCTsWq+i6q5Ripo6i6pFyrPvSq/nw6+qqq+5ZLSsBbD++qLHCrEn26sDa7AJq53HCagae7AKGxPNabLEKqceK7VRG60j2xRey5dhm7VQEbJnG7AlC7Vui7FKobIrGzAM0LJ91XncFBAAOw==',
  sndDiamante: 'UklGRvwDAABXQVZFZm10IBIAAAABAAEAQB8AAIA+AAACABAAAABkYXRhOAIAAITBhMGEwYTBhMGEwYTBhMGI/4j/iP+I/4j/iP+I/4j/iP+EwYTBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+I/4j/hMGEwYTBhMGEwYTBhMGEwYj/iP+I/4j/iP+I/4j/iP+EwYTBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+I/4TBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+I/4TBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+I/4TBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+EwYTBhMGEwYTBhMGI/4j/iP+I/4j/iP+I/4TBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/hMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+EwYTBhMGEwYTBhMGI/4j/iP+I/4j/iP+EwYTBhMGEwYTBiP+I/4j/iP+I/4j/hMGEwYTBhMGEwYj/iP+I/4j/iP+I/4TBhMGEwYTBhMGI/4j/iP+I/4j/hMGEwYTBhMGEwYj/iP+I/4j/iP+EwYTBhMGEwYj/iP+I/4j/iP+EwYTBhMGEwYj/iP+I/4j/hMGEwYTBhMGEwYj/iP+I/4j/hMGEwYTBiP+I/4j/iP+EwYTBhMGEwYj/iP+I/4TBhMGEwYj/iP+I/4TBhMGEwYj/iP+I/4TBhMGEwYj/iP+I/4TBhMGI/4j/hMGEwYTBiP+I/4TBhMGI/4TBhMGI/4j/hMGI/4TBiP+EwYj/iP9BRkFulQEAAAQLc3RyZWFtdHlwZWSB6AOEAUCEhIQTTlNNdXRhYmxlRGljdGlvbmFyeQCEhAxOU0RpY3Rpb25hcnkAhIQITlNPYmplY3QAhYQBaQOShISECE5TU3RyaW5nAZWEASsERGF0ZYaShISEBk5TRGF0ZQCVhAFkgyJTft3Wm7JBhpKEl5gSVGFibGVzQXJlQmlnRW5kaWFuhpKEhIQITlNOdW1iZXIAhIQHTlNWYWx1ZQCVhAEqhIQBY54AhpKEl5gIQ2hhbm5lbHOGkoSEhA5OU011dGFibGVBcnJheQCEhAdOU0FycmF5AJWWAZKEk5YFkoSXmANNYXiGkoScnYSEAWahgwDw+T6GkoSXmA1BRlJNU1dhdmVmb3JthpKEhIQGTlNEYXRhAJWWCIQEWzhjXX+nrj4AAAAAhpKEl5gOQUZNZWFuV2F2ZWZvcm2GkoSplgijoP91PgAAAACGkoSXmANSTVOGkoScnaahg8u8sD6GkoSXmA1BRk1heFdhdmVmb3JthpKEqZYIowDw+T4AAAAAhoaGhgA=',
  sndPiedra: 'UklGRqIBAABXQVZFZm10IBIAAAABAAEAQB8AAIA+AAACABAAAABkYXRhfAEAAITBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4TBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBhMGEwYTBiP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4j/iP+I/4TBhMGEwYj/hMGI/4TBhMGI/4TBhMGI/4j/hMGEwYj/iP+EwYTBiP+I/4TBhMGEwYj/iP+EwYTBhMGI/4j/iP+EwYTBhMGI/4j/iP+EwYTBhMGI/4j/iP+I/4TBhMGEwYj/iP+I/4j/',
  sndPaso: 'UklGRkgAAABXQVZFZm10IBIAAAABAAEAQB8AAIA+AAACABAAAABkYXRhIgAAAITBhMGEwYTBhMGEwYTBhMGI/4j/iP+I/4j/iP+I/4j/iP8='
};
var DIGGER_NIVELES = [
  'ZmZmZmZmZmZmZmUiIiIcEmIiJlZgEmZiERJiIiZWYCJlYhESYmZmVmAlZWYiIlJiIlZgJVVWZlIiYiFWZmZmVVZWZmIiVmERElVWVmVSIVZmFSBWVlZiUiFWYRWgZlZWYlIhVmYVIGVWVmJSIVZhFSBlUhJVUiFWZhUhZVISVVIiVmZmZmZmZmZmZmYBAECcQAQLUwAAAAAAAAAA',
  'ZmZmZmZmZmZmZmoBAiIiIiIAARZmZgImZmFiVVVWYiICJlVhYiIiJmJRUSZVYWIAARZiJlZmVWFiVVVWYiZVVlVRYiIiJmImVlZVYWIiIiZiJlVmZmFiIiImYiZlVWwhIiIiJmIiZlYiJmZmIhZiIiZmIiIiIiEWYiACIiERVVVVVmZmZmZmZmZmZmYCnEA4QQEDQgAAAAAAAAAA',
  'ZmZmZmZmZmZmZmERERERERFhERZgAiIiIiIiYREWYAIiIiIiIm7u5mACZiIiIiEiIqZgAiImIiIlJSLGYAIiIiISIiElVm4iIiIiIiIiIiZgBlZWFVZmZmZmYAYGVhVWAAAAVmAGBlZlZgAAAFZgAAYGZWAAAABWYAAABmVVVVVVVmZmZmZmZmZmZmYDOEHUQRIGNgAAAAAAAAAA',
  'ZmZmZmZmZmZmZmVVVVVlFRUVFRZgAHAAYAcAAAAGYREREWIiIiIixmEREREiIiIiIiZu7u7iIiIRESImYiIiIiIiFRUiJmIiIiISImZmIiZhEREhEiIiJiIWYiIqIhESIhYSVmZmZiISIiVWUiZiISEiEiJSJiIWZRIiIRIhERYiVmZmZmZmZmZmZmYE1EGsUQULIAAAAAAAAAAA',
  'ZmZmZmZmZmZmZmFhVSIiJlVQASZqIiIlZlYiIGYmYGBgZmImAABiJmBgYGUBJgMAYmZgYGBmBmZhImUmY2BgYQZmFmBmBmBgYGY2IiVgxiZlYGBlBmAGYCYGYmBgZSFgBlBWJmViY2ZmYBZRVgZiZWABJmAmZmYmZWVlUlZgUgICBmZmZmZmZmZmZmYFrFHYTwEEICIAAAAAAAAA',
  'ZmZmZmbGZmZmZmIAAAAHAAAAAFZlZmZmZmZmZmYmYmUiIiIiIiJWVmViZmZmYmZmJiZiYmAAAPAABiZWZWJgZmZmZgYmJmJiYGAFUAYGJlZlYmAAYAYABiYmYmJmZmZmZmYmVmVlIiIiIiIiViZiZmZmamZmZmZWZQAAAAAAAAAAJmZmZmZmZmZmZmYG2E9wQgkNGDIAAAAAAAAA',
  'ZmZmZmZmZmZmZmEREREVVVa7u8ZiIiIi5VVWu7u2YwAAABVVVgu7tmIiIiLlVVYAAAZiIiIiFVVWEAAGYiIiImZmZhZmZmMQAiIiIiISIiZhEiIgIiIiEiImYRJSICIiIhIiJmEVVSAiIiISIiZhEREgIiIiEiImYqIiIyIiIiIiJmZmZmZmZmZmZmYHcEKoQwIOJiIiIiIiIiIh',
  'ZmZmZmZmZmZmZmIiIiIiIiIRIiZiEhISEhIiIiImYSEhISEhIiIiJmZmZmZmZgLiIiZiERERERHmIiImYiIiIiIiBiIiJmIiIiIiIAYiIiZiIiIiIgAGIiImYiIiIiAABiIiJmIiIiIiIiYiIiZiIiIiIiEWZmYmaiIiIiIiIiIiLGZmZmZmZmZmZmYIqEMMQwEOEQAAAAAAAAAA',
  'ZmZmZmZmZmZmZmIiIiJrAAAAAAZjADAFZmBmZgMGYiImJmAAAAYABmAANrZmJmYGMAZiIiYGMAAGBgMGYAMGBlVVVgYABmIiJgZVVTYGMAZgMAYGVVVWBgMGYiImBmZmZgYABmMABgAAAAAGMAZiIiZmZmZmZgAGaiImwAAAAAAABmZmZmZmZmZmZmYJDENERAEOFSIgMAICMCAg',
  'ZmZmZmZmZmZmZmIiIiIiIiIiIiZiIiIiIiIiIiImYiIiIiIiIiIiJmIiIiIiIiIiIiZiIiIiIiIiIiImYiIiIiIiIiIiJmIiIiIiIiIiIiZiIiIiIiIiIiIma7u7u7AAACEiJmu7u7uwAAABEiZlVVVVVVVVUiImbFVVVVVVVVIipmZmZmZmZmZmZmYQRER0UBIOJyIiIiIiIiIi',
  'ZmZmZmZmZmZmZmJiYmJiYmJiYmZiYmJiAmJiYmLGYmJiAgICYmJiBmJiAgICAgJiAgZiAgICsgICAgIGYgICsgKyAgICtmICsgICArICsgZisgICAgICsgIGYgICAmICAgICBmICAmJiYgICAmZiAmJiYmJiAmJmamJiYmJiYmJiZmZmZmZmZmZmZmYRdFDgRAEOAAAAAAAAAAAA',
  'ZmZmZmZmZmZmZmIREREREiIiJhZiIiIiIiIiIiYWYiIiIiIiIiImFmoiIiIiIiIiJiZiISEhBiIiIiImYiIiIgYiYiIiJmIiIiImImIAICZiIiEhJiJu7u7mYiIiIiIiYAAABmADAwAAAGAAAAZmYAADAABgAAAGbGUFIiIlYAAABmZmZmZmZmZmZmYS4ER8RQEGEjIgAAAAAAAA',
  'ZmZmZmZmZmZmZmISEhISEhISEhZhISEhISEhISEWYhISEhISEhISZmEhISEhISEhImZiEhISEhISEiJmYSEhISEhISZmZmIiIiIiIiIiIiZiIiImIiIiIiImYiIiJmAiIiIAtmIiIiZgZiIiIiZqIiImYG4iIiImbCIiJmBiIiIiJmZmZmZmZmZmZmYTfEUYRgENIDAAAAAAAAAA',
  'ZmZmZmZmZmZmZmsLAAICAgICAlZlVVUGAgICAgJWZmZmBgICAgICVmAAAAYyMjIyMlZgZmZmZmZmZmFWYAAABmxVIiJiJmZmZgBmZiIiYiZgAAAGZVUgAGImYGZmZmZmILBiJmAAAKZVVSAAYiZmZmYGZmYgsGImYAAABlVVIABiJmZmZmZmZmZmZmYUGEa0RgYMIyIRERIwAAAA',
  'ZmZmZmZmZmZmZmAAAlUSIhISEhZhIgJVUgISEiEmZRIAVVIiEhIhJmESAFZmIhISEhZhEgVmIiISEhIWZmAGZSIiIiIiJmFgFRVgAAAAAAZhYGZmVWMAMAA2YKBlVlVmAzAwBmZjZlZVVgMDMwZmAwZWZlYwAwA2ZszGVVVWMAAABmZmZmZmZmZmZmYVtEbsRwILMCIzMyIjIjMy',
  'ZmZmZmZmZmZmZmIVESJhFiIhIlZiFSIioiAAAmZmYhVmEgBgAAIhVmIRFhABYCIiISZiIVZgImIiMAIWZmYSBRVlYgMBJmIiElERZWIAMhZiZmZmZmZiAwEmYSERASVVESIiJm4RIiIiUiIiISZlJTAAABAAEhUWZQESUiEgDCFRVmZmZmZmZmZmZmYW7EckSQgEICMjMAAAAAAA',
  'ZmZmZmZmZmZmZmERYRFiIiwRERZiomERYAMGEREWYgJhEWAANmZVVmICYRFgAwZVVVZiAmERYDAGIiImYiJmFmMABiUiJmIiIiIiIiIiUiZiJVUiIiIiIiJWYiIiIhISIlJSJmIiIiISEiIiJSZmZmZmYmZmZmZmYwAAAABVVVVVVmZmZmZmZmZmZmYXJEkQUQIEICIzMwAAAAAA',
  'ZmZmZmZmZmZmZmBWAiYiAAVhEhZvZgYmJgUCYioWYAAGJiayAmImZmZmJiImAABiIiZiFiZmZmUAYRJmYVYlZSViAGISJmEWYmJmZgBgIiZlUAAAZQYAZRJmZiZmZmIGxmYiFmAAAAAABmYgEhZgZmZmAAYhIGZmYAVWVwAAAQADBmZmZmZmZmZmZmYYEFHASREEEgAiAAAAAAAA',
  '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',
  'ZmZmZmZmZmZmZmxlImUVERJWAVZlIiBiIlFiFiZmZSZiImYi/yIiJmIiJRFRVlZmAKZmZiYmIiIiJiImYAYmAAZmEVEiVmIiJRYCIgIiBmZiZiVWIiImViIWYiIiIiImIlYiJmAQAGBmZgBmASZlFmAQYVUiIiYmZWFVFWIiZiImVmZmZmZmZmZmZmYziFMkVBIGJQAAAAAAAAAA',
  'ZmZmZmZmZmZmZmIiIiIiIiIiIiZiIiIiIiIiIiImYiIAciBwInACJmIiAAIgACIAAiZiIlACJQAiUAImYiIiIiIiIiIiJmIiIiIiIiIiIiZiIgACIAAiAAImYiJwAiBwIgByJmIiUAIlACJQACZiIiIiIiIiIiImbKIiIiIiIiIiJmZmZmZmZmZmZmY1wFRcVQIOBiIiIiIiIiIh',
  'ZmZmZmZmZmZmZmAAdiISJSxgAHZgAAYiEVIiYAAGZQACIRUSIiUABmZmZiVSIlJmZmZgAHYiIlUAYAB2YAAGIRIiImAABmUAAiEgAiIlAAZmZmYiIAISZmZmYiUmIiICIiAAdmJVJiIiIiJgAAZiIiIiIiISYAAGagImASJQImUABmZmZmZmZmZmZmY2XFX4VQEOFyIgMAICMCAg',
  'ZmZmZmZmZmZmZmFRVRUVVRFRURZlFVFRURVVFVVWYVVVUVVVFVUVFmVRVVUVFVVVUVZhVVUVUVFRUVUWZmYmZmZmZiZmZmAAAABgAAAAAMZgAAAAYAAAAAAGYAAAAGAAAAAABmAAAAAgAAAAAAZgAAAAYBARAAAGahVVFWFVFVAVVmZmZmZmZmZmZmY3+FWUVgEOZgAAAAAAAAAA',
  'ZmZmZmZmZmZmZmERERIhERERERZhERESACIiIiImYREREiIiIiIiJmERERIiIiIiIiZiIiIiIiIiIu7mYiIiIiIiIiIiJmAAACJQAAAAAAZgAAAiVQAAAAAGYAAAIlVQAAAABmImZmYiJmbiIiZnd3d3dwAAAiImZ3fHd3AAAAIgpmZmZmZmZmZmZmY4lFYwVxIOFiIiIiIAIiIi',
  'ZmZmZmZmZmZmZmwiIiIiIiIhIiZmYiIgAHACIhEmYGIiICIiAgEiJmpiIiAiIgIiIiZgZmVgZmYGAAAGYABlYAEAdlAABmAQZWBmZgZVAAZgZmVgZ3YGVVAGYGVVYGd2BlVVBmBlVWBgAAZVVVZgZmZgZmYGZmZmYAAAAP8AAAB3dmZmZmZmZmZmZmY5MFfMVwEGJDIgAAAAAAAA',
  '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',
  'ZmZmZmZmZmZmZmJSUlVTAAAAAGZgZmJmYGYGJmBmYGMAAGAACgBgZmBgYmVgZmYmYAZgYGViUGVSUmBmYABgZmBgZmADBmBmYAAAAGBmZgZgZQAABgAAIAAGYCJmZmZmYGBgZmBlAAYGMABgYGZjYmYGAAAAAGBmYiIiIlZgY2AAxmZmZmZmZmZmZmZZZGMAZA0FFAQkIgAAAAAA',
  'ZmZmZmZmZmZmZmoAAGEAAAYiVVZiIiIlEAACIiIWYiIiEREAAAAiVmZmZmZmBmZmZmZhECJgAAAmFVFWZSIiUQAAJlFVFmZmZmVQACIiIiZiIiJlVQAiIiImYABwZmYGZmZmZmIiImAAAAYQIVZgECIgVQBSIiFWZSAibFIBFiIiJmZmZmZmZmZmZmZj4GV4ZgEDJAAAAABmZmZm',
  'ZmZmZmZmZmZmZmAAEAsAEAAAAAZgYmVmYGZmZmAGY2BmYlBsZVVgBmAQAAVgZhEWYAZgYAACZWIiImIGZVUABWpgAwBgBmZmUAJlZRUVYAZlZmUFZmIiImMGZWZmUmBiUVJgBmVmZmVgJVZVYAZlZmZmY2ZmZm4mZQAwBgAAAAAABmZmZmZmZmZmZmZkeGYQZwkINCAwEgBmZmZm',
  'ZmZmZmZmZmZmZmUhEABgAhIAAAZlIiAAYCEgAABmZSABAGFiAAAABmIAAiBlYCZmZgZgADACBWAAVVYGZmRGZmVgACFWBmAQEBBlYAEhVgZiISAgZWNRJma2YiLuImVgZmBmBmUAAAVlYGxgZgZlUABVZWBmYGYGZVUFVWoAAGAABmZmZmZmZmZmZmZlEGeoZwkONCAAAABmZmZm',
  'ZmZmZmZmZmZmZmAAAAAgAABWDBZgZmZgZmZiImYWYGVVYGVVYQZWJmBlZWBlZWIGVgZgZmVgZWZhBlYGb1VVamVVUgVmBmBmZmVmZiZmYAZgIiJmUAAwBWAGYAAAJWAAMAJeBmYSIiZSaWlpYAZlFRYWIi5eXlYGYVJVUVFSIiIlVmZmZmZmZmZmZmZnQGjYaAcIQQIwAABmZmZm',
  'ZmZmZmZmZmZmZmISIiIsIiIiISZiIiIiIiIiIiImYiIiIiIiIiIiJmIiIiIiIiIiIiZiIiIiuzsiIiImYiIiIvVfIiIiJmIiIiK1WyIiIiZiIiIie7ciIiImYiIiIiIiIiIiJmIiIiIiIiIiIiZiIiIiIiIiIiImYiIiIioiIiIiJmZmZmZmZmZmZmZpcGkQagkOAjMzMwAAAAAA',
  'ZmZmZmZmZmZmZmAABABURAAAQAZgBAAAQAQEQAAGZAQEREBEBAREVmAEAABAAAAEQEZgRAREQEBAAAAGYAAAAAAEBERERmREREBARAAAAAZgAEBAAAQEAEBWYEBARAREBERARmBAAEAABAAAAAZtREQARARAREBGagAAAAQAAABABmZmZmZmZmZmZmZwEGqoagEOAwAAAABmZmZm',
  'ZmZmZmZmZmZmZmERUSYiIiIiIiZiIiImMAAAACAGYLAABlVVVVVVVmIiIhYDAAAAAAZlVVVVVVVVVVVWYhISEhIAEhISFmEhISEhISEhISZiIiIiIiIiIiImYCIiIiIiIiIiJmMloAAAAAAAAAZgJQAAAAAAAAAGbBIiIiIiIiIiJmZmZmZmZmZmZmZyQGvgawQMKAAAAAAAAAAA',
  'ZmZmZmZmZmZmZmIiIiYRERYCIqZiEhImEREWAhImYSEhJhERFgIhJmISEiARERACIiZiIiImEWEWMwAGYDAAJmYWZiISJmIiIiIiIiIiIiZiIiIiIhISEhImZmbu7mIubmLmJmAAAABgADAAAAZlAAAAYAAAADAGZVAAAGAAMFAAxmZmZmZmZmZmZmZ1IG3AbRIDIBIiIgAAAAAA',
  'ZmZmZmZmZmZmZmEREWISEhEgCQZhERFiISEhIAkGYRERYRISESAJBmEREWIiIiIgCQZmERZiIiIiKgCWZmJmAzAAAiIiJmIiImIiIiIiIiZiIiJmZubmIiImZm7uYAawBlVVVmAAAAsGBrZRURZgAAALtjYGFVVWYAAAAAYABlFVxmZmZmZmZmZmZmZ2wG1gbg8HQCIAAAAAAAAA',
  'ZmZmZmZmZmZmZmIRwiIioiIiJlZiEWISEiISERZWYhFiEhIhIhEWVmIhJmZmIiIiJlZiIiYiIiADAAZWZiImJmViIiImVmIiJiZWYAMABlZgMAYiImZmZiFmYmZmYm7u7iICJmERESJgYAIiAiZu7u7iYGBiYgYmYiIiImBgsLACVmZmZmZmZmZmZmZ3YG4AbwoDJyIgAAAAAAAA',
  'ZmZmZmZmZmZmZmIiIhIiIqEiIhZhERIhESEiERImZVVQJVIlIlVbBmUiKyVRJSJSVSZlISAlJSUiURUWZVUgJSUlIlEVJmUiKyUiVSJRFRZlILAlIFUiURUmZREgJSslIlJVBmVVUCUABSJVUrZu7u7u7u7u7u7mbAAAAAAAAAAAxmZmZmZmZmZmZmaAQHAAAAwDdQAAAAAAAAAA',
];

/* ============================================================
   ⛏️ DIGGER — portado a la ventana del arcade de SikoChat (v52)
   Juego original: Digger (Windmill Software, 1983).
   Remaster en JavaScript de Lutz Roeder (github.com/lutzroeder/digger, MIT).
   Portado 1:1: mismo motor de tic de 50 ms, las mismas 60 salas,
   los mismos sprites GIF y los mismos sonidos WAV (ver DIGGER_RES).
   Cambios honestos del port: se dibuja en el lienzo del arcade
   (640×512), las salidas de rango se tratan como pared (el original
   podía tirar un error en el borde), el fantasma aplastado sí "muere"
   (en el original esa línea fallaba y se perdía un tic) y acá hay
   ficha de pausa/récord como los otros juegos del arcade.
   ============================================================ */
function crearDigger(){
  var SPR = { nada:0, piedra:1, tierra:2, fant180:3, uvsalida:4, diamante:5, pared:6, fant90L:7, marca:8, uvpiedra:9, jugador:10, fant90LR:11, salida:12, buffer:13, cambiador:14, fant90R:15 };
  var DIR = { nada:0, izq:1, der:2, arriba:3, abajo:4 };
  var SON = { diamante:0, piedra:1, paso:2 };
  var ANCHO = 20, ALTO = 14, TECHO = 64; /* cabecera: 32 px lógicos ×2 */

  function Pos(x, y){ this.x = x; this.y = y; }
  Pos.prototype.igual = function(o){ return this.x === o.x && this.y === o.y; };
  Pos.prototype.clonar = function(){ return new Pos(this.x, this.y); };

  function Jugador(pos){
    this.dir = DIR.nada; this.piedra = [false, false]; this.paso = 0; this.vivo = true; this.pos = pos;
  }
  Jugador.prototype.matar = function(){ this.vivo = false; };
  Jugador.prototype.animar = function(){
    this.paso++;
    var max = 30;
    if (this.dir === DIR.izq || this.dir === DIR.der) max = 6;
    if (this.dir === DIR.arriba || this.dir === DIR.abajo) max = 2;
    this.paso = (this.paso >= max) ? 0 : this.paso;
  };
  Jugador.prototype.sprite = function(){
    if (!this.vivo) return 31;
    if (this.dir === DIR.izq && this.paso < 6) return [16, 17, 18, 19, 18, 17][this.paso];
    if (this.dir === DIR.der && this.paso < 6) return [20, 21, 22, 23, 22, 21][this.paso];
    if (this.dir === DIR.arriba && this.paso < 2) return [24, 25][this.paso];
    if (this.dir === DIR.abajo && this.paso < 2) return [26, 27][this.paso];
    return [15, 15, 15, 15, 15, 15, 15, 15, 28, 28, 15, 15, 28, 28, 15, 15, 15, 15, 15, 15, 29, 29, 30, 30, 29, 29, 15, 15, 15, 15][this.paso];
  };

  function Fantasma(pos, tipo, dir, giro){
    this.vivo = true; this.pos = pos; this.tipo = tipo; this.dir = dir; this.giro = giro;
  }
  Fantasma.prototype.matar = function(){ this.vivo = false; };
  Fantasma.prototype.sprite = function(){ return [4, 4, 5, 6, 3][this.dir]; };

  function Nivel(datos){
    this.juntados = 0; this.tiempo = 5000; this.puntos = 0; this.snd = [false, false, false];
    this.mapa = [];
    for (var x = 0; x < ANCHO; x++) this.mapa[x] = [];
    var crudo = window.atob(datos);
    var arr = new Uint8Array(crudo.length);
    for (var i = 0; i < crudo.length; i++) arr[i] = crudo.charCodeAt(i);
    var ix = 0;
    for (var y = 0; y < ALTO; y++) {
      for (var x2 = 0; x2 < 10; x2++) {
        var b = arr[ix++];
        this.mapa[x2 * 2 + 1][y] = b & 0x0f;
        this.mapa[x2 * 2][y] = b >> 4;
      }
    }
    ix += 5;
    var pos = new Pos(arr[ix++], arr[ix++] - 2);
    this.jugador = new Jugador(pos);
    this.mapa[pos.x][pos.y] = SPR.jugador;
    var dia = arr[ix++];
    this.diamantes = (dia >> 4) * 10 + (dia & 0x0f);
    var datosG = [];
    for (var g = 0; g < 8; g++) datosG.push(arr[ix++]);
    var gi = 0;
    this.fantasmas = [];
    for (var y2 = 0; y2 < ALTO; y2++) {
      for (var x3 = 0; x3 < ANCHO; x3++) {
        if (this.esFantasma(x3, y2)) {
          var info = (gi & 1) !== 0 ? (datosG[gi >> 1] & 0x0f) : (datosG[gi >> 1] >> 4);
          var d = info < 4 ? [DIR.abajo, DIR.arriba, DIR.der, DIR.izq][info] : DIR.nada;
          var giro = (gi & 1) !== 0 ? DIR.der : DIR.izq;
          this.fantasmas.push(new Fantasma(new Pos(x3, y2), this.mapa[x3][y2], d, giro));
          gi++;
        }
      }
    }
  }
  /* acceso con guardia: fuera del mapa = pared (el original leía undefined) */
  Nivel.prototype.celda = function(x, y){
    if (x < 0 || x >= ANCHO || y < 0 || y >= ALTO) return SPR.pared;
    return this.mapa[x][y];
  };
  Nivel.prototype.jugadorVivo = function(){ return this.jugador.vivo; };
  Nivel.prototype.esJugador = function(x, y){ return this.celda(x, y) === SPR.jugador; };
  Nivel.prototype.esFantasma = function(x, y){
    var c = this.celda(x, y);
    return c === SPR.fant90L || c === SPR.fant90R || c === SPR.fant90LR || c === SPR.fant180;
  };
  Nivel.prototype.actualizar = function(){
    for (var y = ALTO - 1; y >= 0; y--) {
      for (var x = ANCHO - 1; x >= 0; x--) {
        if (this.mapa[x][y] === SPR.buffer) this.mapa[x][y] = SPR.nada;
      }
    }
    this.snd = [false, false, false];
  };
  Nivel.prototype.sonido = function(s){ return this.snd[s]; };
  Nivel.prototype.mover = function(){
    /* gravedad de piedras y diamantes — pasada 1: marcas */
    for (var y = ALTO - 1; y >= 0; y--) {
      for (var x = ANCHO - 1; x >= 0; x--) {
        var aqui = this.celda(x, y);
        if (aqui === SPR.piedra || aqui === SPR.diamante || aqui === SPR.uvpiedra) {
          var dx = x, dy = y;
          if (this.celda(x, y + 1) === SPR.nada) {
            dy = y + 1;
          } else {
            if (this.celda(x, y + 1) === SPR.piedra || this.celda(x, y + 1) === SPR.diamante) {
              if (this.celda(x - 1, y + 1) === SPR.nada && this.celda(x - 1, y) === SPR.nada) { dx = x - 1; dy = y + 1; }
              else if (this.celda(x + 1, y + 1) === SPR.nada && this.celda(x + 1, y) === SPR.nada) { dx = x + 1; dy = y + 1; }
            }
            if (this.celda(x, y + 1) === SPR.cambiador && (aqui === SPR.piedra || aqui === SPR.uvpiedra) && this.celda(x, y + 2) === SPR.nada) {
              dy = y + 2;
            }
          }
          if (dx !== x || dy !== y) this.mapa[dx][dy] = SPR.marca;
        }
      }
    }
    /* pasada 2: caída de verdad */
    for (var y2 = ALTO - 1; y2 >= 0; y2--) {
      for (var x2 = ANCHO - 1; x2 >= 0; x2--) {
        var aqui2 = this.celda(x2, y2);
        if (aqui2 === SPR.piedra || aqui2 === SPR.diamante || aqui2 === SPR.uvpiedra) {
          var dx2 = x2, dy2 = y2;
          if (this.celda(x2, y2 + 1) === SPR.marca) {
            dy2 = y2 + 1;
          } else {
            if (this.celda(x2, y2 + 1) === SPR.piedra || this.celda(x2, y2 + 1) === SPR.diamante || this.celda(x2, y2 + 1) === SPR.nada) {
              if (this.celda(x2 - 1, y2 + 1) === SPR.marca && (this.celda(x2 - 1, y2) === SPR.nada || this.celda(x2 - 1, y2) === SPR.marca)) { dx2 = x2 - 1; dy2 = y2 + 1; }
              else if (this.celda(x2 + 1, y2 + 1) === SPR.marca && (this.celda(x2 + 1, y2) === SPR.nada || this.celda(x2 + 1, y2) === SPR.marca)) { dx2 = x2 + 1; dy2 = y2 + 1; }
            }
            if (this.celda(x2, y2 + 1) === SPR.cambiador && (aqui2 === SPR.piedra || aqui2 === SPR.uvpiedra) && this.celda(x2, y2 + 2) === SPR.marca) {
              dy2 = y2 + 2;
            }
          }
          if (dx2 !== x2 || dy2 !== y2) {
            if ((dy2 - y2) === 2) {
              this.mapa[dx2][dy2] = SPR.diamante; /* el cambiador convierte la piedra en diamante */
            } else {
              this.mapa[dx2][dy2] = aqui2;
              if (this.mapa[dx2][dy2] === SPR.uvpiedra) this.mapa[dx2][dy2] = SPR.piedra;
            }
            this.mapa[x2][y2] = SPR.nada;
            var bajo = this.celda(dx2, dy2 + 1);
            if (bajo === SPR.piedra || bajo === SPR.diamante || bajo === SPR.pared || this.esFantasma(dx2, dy2 + 1)) {
              this.snd[SON.piedra] = true;
            }
            if (this.esJugador(dx2, dy2 + 1)) this.jugador.matar();
            if (this.esFantasma(dx2, dy2 + 1)) this.matarFantasma(dx2, dy2 + 1);
          }
        }
      }
    }
    for (var i = 0; i < this.fantasmas.length; i++) this.moverFantasma(this.fantasmas[i]);
    if (this.tiempo > 0) this.tiempo--;
    if (this.tiempo === 0) this.jugador.matar();
  };
  Nivel.prototype.moverJugador = function(llaves){
    if (this.jugador.vivo) {
      this.jugador.dir = DIR.nada;
      var d = this.jugador.pos.clonar();
      var z = d.clonar();
      if (llaves[0]) { z.x--; this.jugador.dir = DIR.izq; }
      else {
        this.jugador.piedra[0] = false;
        if (llaves[1]) { z.x++; this.jugador.dir = DIR.der; }
        else {
          this.jugador.piedra[1] = false;
          if (llaves[2]) { z.y--; this.jugador.dir = DIR.arriba; }
          else if (llaves[3]) { z.y++; this.jugador.dir = DIR.abajo; }
        }
      }
      if (!d.igual(z)) {
        var ziel = this.celda(z.x, z.y);
        if (ziel === SPR.nada) this.ponerJugador(d.x, d.y);
        if (ziel === SPR.diamante) {
          this.juntados += 1;
          this.puntos += 3;
          this.snd[SON.diamante] = true;
        }
        if (ziel === SPR.piedra) {
          if ((z.x > d.x) && (this.celda(z.x + 1, z.y) === SPR.nada)) {
            if (this.jugador.piedra[1]) {
              this.mapa[d.x + 2][d.y] = this.mapa[d.x + 1][d.y];
              this.mapa[d.x + 1][d.y] = SPR.nada;
            }
            this.jugador.piedra[1] = !this.jugador.piedra[1];
          }
          if ((z.x < d.x) && (this.celda(z.x - 1, z.y) === SPR.nada)) {
            if (this.jugador.piedra[0]) {
              this.mapa[d.x - 2][d.y] = this.mapa[d.x - 1][d.y];
              this.mapa[d.x - 1][d.y] = SPR.nada;
            }
            this.jugador.piedra[0] = !this.jugador.piedra[0];
          }
        }
        if (ziel === SPR.nada || ziel === SPR.tierra || ziel === SPR.diamante) {
          this.ponerJugador(z.x, z.y);
          this.mapa[d.x][d.y] = SPR.buffer;
          this.snd[SON.paso] = true;
        }
        if (ziel === SPR.salida || ziel === SPR.uvsalida) {
          if (this.juntados >= this.diamantes) return true; /* sala completa */
        }
        if (this.esFantasma(z.x, z.y)) this.jugador.matar();
      }
      this.jugador.animar();
    }
    return false;
  };
  Nivel.prototype.ponerJugador = function(x, y){
    this.mapa[x][y] = SPR.jugador;
    this.jugador.pos.x = x; this.jugador.pos.y = y;
  };
  Nivel.prototype.ponerFantasma = function(x, y, f){
    this.mapa[x][y] = f.tipo;
    f.pos.x = x; f.pos.y = y;
  };
  Nivel.prototype.matarFantasma = function(x, y){
    var f = this.fantasma(x, y);
    if (f && f.vivo) {
      for (var dy = y - 1; dy <= y + 1; dy++) {
        for (var dx = x - 1; dx <= x + 1; dx++) {
          if ((dx > 0) && (dx < ANCHO - 1) && (dy > 0) && (dy < ALTO - 1)) {
            if (this.esJugador(dx, dy)) {
              this.jugador.matar();
            } else {
              if (this.esFantasma(dx, dy)) {
                var otro = this.fantasma(dx, dy);
                if (otro) otro.vivo = false;
                this.puntos += 99;
              }
              this.mapa[dx][dy] = SPR.nada;
            }
          }
        }
      }
      f.matar();
    }
  };
  Nivel.prototype.fantasma = function(x, y){
    for (var i = 0; i < this.fantasmas.length; i++) {
      if ((x === this.fantasmas[i].pos.x) && (y === this.fantasmas[i].pos.y)) return this.fantasmas[i];
    }
    return null;
  };
  Nivel.prototype.moverFantasma = function(f){
    if (!f.vivo) return;
    var p = f.pos.clonar();
    var w = [p.clonar(), p.clonar(), p.clonar(), p.clonar()];
    if (f.tipo === SPR.fant180 || f.tipo === SPR.fant90L || f.tipo === SPR.fant90R) {
      if (f.tipo === SPR.fant180) {
        if (f.dir === DIR.izq) { w[0].x--; w[1].x++; }
        if (f.dir === DIR.der) { w[0].x++; w[1].x--; }
        if (f.dir === DIR.arriba) { w[0].y--; w[1].y++; }
        if (f.dir === DIR.abajo) { w[0].y++; w[1].y--; }
      } else if (f.tipo === SPR.fant90L) {
        if (f.dir === DIR.izq) { w[0].x--; w[1].y++; w[2].y--; w[3].x++; }
        if (f.dir === DIR.der) { w[0].x++; w[1].y--; w[2].y++; w[3].x--; }
        if (f.dir === DIR.arriba) { w[0].y--; w[1].x--; w[2].x++; w[3].y++; }
        if (f.dir === DIR.abajo) { w[0].y++; w[1].x++; w[2].x--; w[3].y--; }
      } else if (f.tipo === SPR.fant90R) {
        if (f.dir === DIR.izq) { w[0].x--; w[1].y--; w[2].y++; w[3].x++; }
        if (f.dir === DIR.der) { w[0].x++; w[1].y++; w[2].y--; w[3].x--; }
        if (f.dir === DIR.arriba) { w[0].y--; w[1].x++; w[2].x--; w[3].y++; }
        if (f.dir === DIR.abajo) { w[0].y++; w[1].x--; w[2].x++; w[3].y--; }
      }
      for (var i = 0; i < 4; i++) {
        if (!p.igual(w[i])) {
          var d = w[i].clonar();
          if (this.esJugador(d.x, d.y)) this.jugador.matar();
          if (this.celda(d.x, d.y) === SPR.nada) {
            if (d.x < p.x) f.dir = DIR.izq;
            if (d.x > p.x) f.dir = DIR.der;
            if (d.y < p.y) f.dir = DIR.arriba;
            if (d.y > p.y) f.dir = DIR.abajo;
            this.ponerFantasma(d.x, d.y, f);
            this.mapa[p.x][p.y] = SPR.nada;
            return;
          }
        }
      }
    } else if (f.tipo === SPR.fant90LR) {
      if (f.dir === DIR.izq) {
        w[0].x--; w[3].x++;
        if (f.giro === DIR.izq) { w[1].y--; w[2].y++; } else { w[1].y++; w[2].y--; }
      } else if (f.dir === DIR.der) {
        w[0].x++; w[3].x--;
        if (f.giro === DIR.izq) { w[1].y++; w[2].y--; } else { w[1].y--; w[2].y++; }
      } else if (f.dir === DIR.arriba) {
        w[0].y--; w[3].y++;
        if (f.giro === DIR.izq) { w[1].x++; w[2].x--; } else { w[1].x--; w[2].x++; }
      } else if (f.dir === DIR.abajo) {
        w[0].y++; w[3].y--;
        if (f.giro === DIR.izq) { w[1].x--; w[2].x++; } else { w[1].x++; w[2].x--; }
      }
      for (var j = 0; j < 4; j++) {
        if (!p.igual(w[j])) {
          var dj = w[j].clonar();
          if (this.esJugador(dj.x, dj.y)) this.jugador.matar();
          if (this.celda(dj.x, dj.y) === SPR.nada) {
            var antes = f.dir;
            if (dj.x < p.x) f.dir = DIR.izq;
            if (dj.x > p.x) f.dir = DIR.der;
            if (dj.y < p.y) f.dir = DIR.arriba;
            if (dj.y > p.y) f.dir = DIR.abajo;
            if (antes === DIR.izq) {
              if (f.dir === DIR.abajo) f.giro = DIR.izq;
              if (f.dir === DIR.arriba) f.giro = DIR.der;
            } else if (antes === DIR.der) {
              if (f.dir === DIR.abajo) f.giro = DIR.der;
              if (f.dir === DIR.arriba) f.giro = DIR.izq;
            } else if (antes === DIR.arriba) {
              if (f.dir === DIR.izq) f.giro = DIR.izq;
              if (f.dir === DIR.der) f.giro = DIR.der;
            } else if (antes === DIR.abajo) {
              if (f.dir === DIR.izq) f.giro = DIR.der;
              if (f.dir === DIR.der) f.giro = DIR.izq;
            }
            this.ponerFantasma(dj.x, dj.y, f);
            this.mapa[p.x][p.y] = SPR.nada;
            return;
          }
        }
      }
    }
  };
  Nivel.prototype.spriteEn = function(x, y, parpadeo){
    var c = this.celda(x, y);
    switch (c) {
      case SPR.uvsalida: case SPR.buffer: case SPR.marca: case SPR.uvpiedra:
        return 0;
      case SPR.piedra: return 1;
      case SPR.tierra: return 2;
      case SPR.diamante: return 13 - ((parpadeo + 4) % 6);
      case SPR.pared: return 14;
      case SPR.salida: return 32;
      case SPR.cambiador: return 33;
      case SPR.fant90L: case SPR.fant90R: case SPR.fant90LR: case SPR.fant180: {
        var f = this.fantasma(x, y);
        return f ? f.sprite() : 0;
      }
      case SPR.jugador:
        if (x === this.jugador.pos.x && y === this.jugador.pos.y) return this.jugador.sprite();
        return 15;
    }
    return 0;
  };

  /* ---------- estado del juego (equivalente a Application) ---------- */
  var yo = {
    clave: 'digger', nom: 'DIGGER', emo: '⛏️', ratio: [640, 512], estado: 'idle',
    puntos: 0, nivel: 1, vidas: 20, hsViejo: 0,
    esperando: false, cartel: 0, cartelTxt: ''
  };
  var nivelAct = null, sala = 0;
  var llaves = [false, false, false, false], sueltas = [false, false, false, false];
  var tick = 0, parpadeo = 0, acc = 0;
  var imgFuente = null, imgSprites = null, listo = false;

  function cargarImagen(b64, alCargar){
    var im = new Image();
    im.onload = alCargar;
    im.src = 'data:image/gif;base64,' + b64;
    return im;
  }
  imgFuente = cargarImagen(DIGGER_RES.fuente, function(){
    imgSprites = cargarImagen(DIGGER_RES.sprites, function(){ listo = true; });
  });

  /* sonidos WAV originales (diamante / piedra / paso) por WebAudio */
  var sonCtx = null, sonBuf = {}, sonPidiendo = false;
  function sonCargar(){
    if (sonPidiendo) return;
    sonPidiendo = true;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      sonCtx = (typeof arcSfx !== 'undefined' && arcSfx.ctx) ? arcSfx.ctx : new AC();
      var claves = [DIGGER_RES.sndDiamante, DIGGER_RES.sndPiedra, DIGGER_RES.sndPaso];
      var nombres = ['diamante', 'piedra', 'paso'];
      for (var i = 0; i < 3; i++) {
        (function(n, b64){
          try {
            var bin = window.atob(b64), n2 = bin.length;
            var buf = new ArrayBuffer(n2), arr = new Uint8Array(buf);
            for (var j = 0; j < n2; j++) arr[j] = bin.charCodeAt(j);
            sonCtx.decodeAudioData(buf, function(au){ sonBuf[n] = au; }, function(){});
          } catch (e) {}
        })(nombres[i], claves[i]);
      }
    } catch (e) {}
  }
  function sonTocar(n){
    try {
      if (typeof arcSonidoOn !== 'undefined' && !arcSonidoOn) return false;
      sonCargar();
      var b = sonBuf[n];
      if (!b || !sonCtx) return false;
      if (sonCtx.state === 'suspended') { try { sonCtx.resume(); } catch (e) {} }
      var src = sonCtx.createBufferSource();
      src.buffer = b; src.connect(sonCtx.destination); src.start(0);
      return true;
    } catch (e) { return false; }
  }

  /* ---------- sala / vidas / partida ---------- */
  function cargarSala(){
    nivelAct = new Nivel(DIGGER_NIVELES[sala]);
    llaves = [false, false, false, false];
    sueltas = [false, false, false, false];
    tick = 0; acc = 0;
    yo.nivel = sala + 1;
    yo.esperando = false;
  }
  function finDePartida(){
    yo.esperando = false;
    try { arcHSguardar('digger', yo.puntos); } catch (e) {}
    if (typeof arcSfx !== 'undefined') arcSfx.fin();
    yo.estado = 'over';
    if (typeof arcFicha === 'function') arcFicha('over');
  }
  function revivir(){
    /* igual que Key.reset del original: una vida menos y la sala otra vez */
    yo.vidas--;
    if (yo.vidas >= 0) {
      cargarSala();
    } else {
      finDePartida();
    }
  }
  yo.revivir = function(){ if (yo.estado === 'playing' && yo.esperando) revivir(); };
  yo.esperandoVida = function(){ return yo.esperando; };
  /* ganchos para pruebas (QA) */
  yo.__niv = function(){ return nivelAct; };
  yo.__sala = function(){ return sala; };
  yo.tecla = function(t){ if (t >= 0 && t < 4) llaves[t] = true; };
  yo.soltarTecla = function(t){ if (t >= 0 && t < 4) sueltas[t] = true; };
  yo.deslizar = function(d){ /* el gesto del original: activa una dirección y suelta las demás */
    for (var i = 0; i < 4; i++) { if (d === i) yo.tecla(i); else yo.soltarTecla(i); }
  };
  yo.soltarTodo = function(){ yo.soltarTecla(0); yo.soltarTecla(1); yo.soltarTecla(2); yo.soltarTecla(3); };

  yo.empezar = function(){
    yo.vidas = 20; yo.puntos = 0; sala = 0;
    yo.hsViejo = arcHSleer('digger');
    yo.cartel = 0;
    cargarSala();
    yo.estado = 'playing';
    sonCargar();
  };

  /* ---------- tic de 50 ms (igual que el setInterval original) ---------- */
  function tique(){
    tick++;
    parpadeo = (parpadeo + 1) % 6;
    if ((tick % 2) === 0) {
      for (var i = 0; i < 4; i++) {
        if (sueltas[i]) { llaves[i] = false; sueltas[i] = false; }
      }
      nivelAct.actualizar();
      if (nivelAct.moverJugador(llaves)) {
        /* salió por la puerta: sala siguiente (o fin si era la última) */
        if (sala < DIGGER_NIVELES.length - 1) {
          sala++;
          cargarSala();
          yo.cartel = 1.6; yo.cartelTxt = 'SALA ' + (sala + 1);
          if (typeof arcSfx !== 'undefined') { arcSfx.tono(520, 0.12, { tipo: 'triangle', vol: 0.08 }); arcSfx.tono(780, 0.16, { tipo: 'triangle', vol: 0.08, demora: 0.1 }); }
        } else {
          finDePartida();
          return;
        }
      } else {
        nivelAct.mover();
        var nombres = ['diamante', 'piedra', 'paso'];
        for (var s = 0; s < 3; s++) {
          if (nivelAct.sonido(s) && sonTocar(nombres[s])) break;
        }
      }
      if (!yo.esperando && !nivelAct.jugadorVivo()) {
        yo.esperando = true;
        llaves = [false, false, false, false];
        if (typeof arcSfx !== 'undefined') arcSfx.tono(300, 0.45, { hasta: 70, vol: 0.12 });
      }
    }
    yo.puntos += nivelAct.puntos;
    nivelAct.puntos = 0;
  }
  yo.paso = function(dt){
    if (yo.cartel > 0) yo.cartel -= dt;
    if (yo.estado !== 'playing') return;
    acc += dt;
    var pasos = 0;
    while (acc >= 0.05 && pasos < 4) { acc -= 0.05; tique(); pasos++; }
    if (acc > 0.05) acc = 0; /* si el aparato no da abasto no juntamos deuda */
  };

  /* ---------- dibujo ---------- */
  function rellenar(v, d){
    var t = String(v);
    while (t.length < d) t = '0' + t;
    return t;
  }
  function texto(g, x, y, s){
    for (var i = 0; i < s.length; i++) {
      var ix = s.charCodeAt(i) - 32;
      g.fillRect(x * 2, y * 2, 16, 16);
      if (ix >= 0) g.drawImage(imgFuente, 0, ix * 16, 16, 16, x * 2, y * 2, 16, 16);
      x += 8;
    }
  }
  yo.pintar = function(g){
    /* cabecera (igual que el constructor del original) */
    g.fillStyle = '#040289';
    g.fillRect(0, 0, 640, 16); g.fillRect(0, 48, 640, 16);
    g.fillStyle = '#70e4c2';
    g.fillRect(0, 4, 640, 8); g.fillRect(0, 52, 640, 8);
    g.fillStyle = '#920205';
    g.fillRect(0, 16, 640, 32);
    if (!listo) {
      g.fillStyle = '#000'; g.fillRect(0, TECHO, 640, 512 - TECHO);
      return;
    }
    /* TODO se repinta cada frame: sin cache de celdas. El original ahorraba con
       una cache sucia, pero acá la ventana puede cambiar de tamaño (pantalla
       entera, girar el celu) y eso borra el lienzo entero — con repintado
       completo nunca quedan celdas ni rótulos enterrados. ~700 operaciones por
       frame: liviano para cualquier celu, PC o TV. */
    g.fillStyle = '#920205';
    texto(g, 0, 8, '  ROOM:     TIME:        DIAMONDS:      ');
    texto(g, 0, 16, '  LIVES:    SCORE:       COLLECTED:     ');
    texto(g, 9 * 8, 8, rellenar(sala + 1, 2));
    texto(g, 9 * 8, 16, rellenar(Math.max(0, yo.vidas), 2));
    texto(g, 19 * 8, 16, rellenar(yo.puntos, 5));
    texto(g, 19 * 8, 8, rellenar(nivelAct ? nivelAct.tiempo : 0, 5));
    texto(g, 36 * 8, 8, rellenar(nivelAct ? nivelAct.diamantes : 0, 2));
    texto(g, 36 * 8, 16, rellenar(nivelAct ? nivelAct.juntados : 0, 2));
    /* celdas del campo, todas, cada frame */
    var par = (parpadeo + 4) % 6;
    for (var y = 0; y < ALTO; y++) {
      for (var x = 0; x < ANCHO; x++) {
        var s = nivelAct ? nivelAct.spriteEn(x, y, par) : 0;
        g.fillStyle = '#000';
        g.fillRect(x * 32, y * 32 + TECHO, 32, 32);
        if (s > 0) g.drawImage(imgSprites, s * 32, 0, 32, 32, x * 32, y * 32 + TECHO, 32, 32);
      }
    }
    if (yo.cartel > 0) {
      g.fillStyle = 'rgba(4,2,20,0.72)';
      g.fillRect(170, 216, 300, 80);
      g.strokeStyle = '#f59d3d'; g.lineWidth = 3;
      g.strokeRect(170, 216, 300, 80);
      g.fillStyle = '#ffd23f';
      g.font = 'bold 34px Montserrat, sans-serif';
      g.textAlign = 'center';
      g.fillText(yo.cartelTxt, 320, 268);
      g.textAlign = 'left';
    }
    if (yo.esperando) {
      g.fillStyle = 'rgba(6,2,20,0.55)';
      g.fillRect(0, TECHO, 640, 512 - TECHO);
      g.textAlign = 'center';
      g.fillStyle = '#ff8db0';
      g.font = 'bold 32px Montserrat, sans-serif';
      g.fillText('☠️ ¡Te atraparon!', 320, 246);
      g.fillStyle = '#fff';
      g.font = 'bold 20px Montserrat, sans-serif';
      g.fillText('tocá o apretá una tecla para seguir', 320, 288);
      g.textAlign = 'left';
    }
  };

  yo.stats = function(){
    return [
      { t: 'Puntos', v: yo.puntos, c: 'amar' },
      { t: 'Récord', v: Math.max(arcHSleer('digger'), yo.puntos), c: 'verde' },
      { t: 'Sala', v: yo.nivel + '/' + DIGGER_NIVELES.length, c: 'violeta' },
      { t: '💎', v: (nivelAct ? nivelAct.juntados : 0) + '/' + (nivelAct ? nivelAct.diamantes : 0), c: '' },
      { t: 'Vidas', v: Math.max(0, yo.vidas), c: 'rosa' }
    ];
  };

  /* la sala 1 ya cargada detrás de la ficha, como el original al abrir */
  cargarSala();
  return yo;
}
