import { Copy, MoreHorizontal, ExternalLink, Edit, Copy as CopyIcon, EyeOff, Info, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from './ui/sheet';
import { useState } from 'react';

interface GameCardProps {
  title: string;
  status: 'publicado' | 'borrador';
  url: string;
  onViewDetails?: () => void;
}

export function GameCard({ title, status, url, onViewDetails }: GameCardProps) {
  const [open, setOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://example.com${url}`);
    toast.success('URL copiada al portapapeles');
  };

  const handleAction = (action: string) => {
    toast.success(`${action} ejecutado`);
    setOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate mb-1.5">{title}</h3>
            <Badge 
              variant={status === 'publicado' ? 'default' : 'secondary'}
              className={`text-xs font-medium ${
                status === 'publicado' 
                  ? 'bg-teal-100 text-teal-700 hover:bg-teal-100' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {status === 'publicado' ? 'Publicado' : 'Borrador'}
            </Badge>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 flex-shrink-0"
              >
                <MoreHorizontal className="h-5 w-5 text-gray-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader className="text-center pb-4">
                <SheetTitle className="text-xl">Más</SheetTitle>
                <SheetDescription className="sr-only">
                  Menú de acciones para el juego
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-2 pb-6">
                <Button
                  variant="outline"
                  className="w-full h-14 text-base justify-center border-gray-200"
                  onClick={() => handleAction('Abrir')}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Abrir
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-14 text-base justify-center border-gray-200"
                  onClick={() => handleAction('Editar')}
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-14 text-base justify-center border-gray-200"
                  onClick={() => {
                    handleAction('Duplicar');
                  }}
                >
                  <CopyIcon className="h-5 w-5 mr-2" />
                  Duplicar
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-14 text-base justify-center border-gray-200"
                  onClick={() => handleAction('Despublicar')}
                >
                  <EyeOff className="h-5 w-5 mr-2" />
                  Despublicar
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-14 text-base justify-center border-gray-200"
                  onClick={() => {
                    setOpen(false);
                    if (onViewDetails) {
                      onViewDetails();
                    } else {
                      handleAction('Ver detalles');
                    }
                  }}
                >
                  <Info className="h-5 w-5 mr-2" />
                  Ver detalles
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-14 text-base justify-center border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleAction('Borrar')}
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Borrar
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Copy Link Button */}
        <Button
          variant="outline"
          className="w-full h-10 gap-2 border-teal-200 text-teal-700 hover:bg-teal-50 hover:border-teal-300 font-medium"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
          Copiar enlace
        </Button>
      </div>
    </>
  );
}