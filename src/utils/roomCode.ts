const CODE_LENGTH = 5;

function randomSuffix(length: number): string {
  let suffix = '';
  while (suffix.length < length) {
    suffix += Math.random().toString(36).substring(2).toUpperCase().replace(/[^A-Z0-9]/g, '');
  }
  return suffix.substring(0, length);
}

export function generateRandomRoomCode(): string {
  return `PHANTOM-${randomSuffix(CODE_LENGTH)}`;
}

export function normalizeRoomCode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, '');
}

export function toJitsiRoomName(roomCode: string): string {
  return normalizeRoomCode(roomCode).replace(/[^A-Z0-9-_]/g, '_');
}
