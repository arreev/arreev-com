
export function isBlank( s:string ) : boolean {
  if ( (s != null) && (s.length > 0) ) {
    return ( s.trim().length === 0 );
  }
  return true;
}
