import QRCode from "qrcode";

export async function qrCodeDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, { margin: 1, width: 240 });
}
